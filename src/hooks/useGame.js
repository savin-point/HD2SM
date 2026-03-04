import { useReducer, useEffect, useCallback } from "react";
import { STRATAGEMS } from "../data/stratagems";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getPool(categoryFilter) {
  if (!categoryFilter) return STRATAGEMS;
  return STRATAGEMS.filter(s => s.category === categoryFilter);
}

const initialState = {
  mode: null,           // null | "infinite" | "timeattack"
  status: "idle",       // "idle" | "playing" | "success" | "fail"
  queue: [],
  queueIndex: 0,
  current: null,
  progress: [],         // indices of correctly entered arrows so far
  score: 0,
  categoryFilter: null, // null | "attack" | "defense" | "supply" | "mission"
};

function reducer(state, action) {
  switch (action.type) {
    case "START": {
      const pool = getPool(state.categoryFilter);
      const queue = shuffle(pool);
      return {
        ...initialState,
        categoryFilter: state.categoryFilter,
        mode: action.mode,
        status: "playing",
        queue,
        queueIndex: 0,
        current: queue[0],
        progress: [],
        score: 0,
      };
    }

    case "INPUT": {
      if (state.status !== "playing") return state;
      const { direction } = action;
      const expected = state.current.arrows[state.progress.length];
      if (direction !== expected) {
        // Wrong input → fail state, keep progress so we know which arrow failed
        return { ...state, status: "fail" };
      }
      const newProgress = [...state.progress, state.progress.length];
      if (newProgress.length === state.current.arrows.length) {
        // Completed!
        return { ...state, status: "success", progress: newProgress, score: state.score + 1 };
      }
      return { ...state, progress: newProgress };
    }

    case "RESUME_FROM_FAIL": {
      if (state.status !== "fail") return state;
      return { ...state, status: "playing", progress: [] };
    }

    case "NEXT": {
      const nextIndex = state.queueIndex + 1;
      const pool = getPool(state.categoryFilter);
      const queue = nextIndex >= state.queue.length ? shuffle(pool) : state.queue;
      const realIndex = nextIndex >= state.queue.length ? 0 : nextIndex;
      return {
        ...state,
        status: "playing",
        queue,
        queueIndex: realIndex,
        current: queue[realIndex],
        progress: [],
      };
    }

    case "SET_FILTER": {
      const pool = getPool(action.filter);
      const queue = shuffle(pool);
      return {
        ...state,
        categoryFilter: action.filter,
        status: "playing",
        queue,
        queueIndex: 0,
        current: queue[0],
        progress: [],
        score: 0,
      };
    }

    case "GAME_OVER": {
      return { ...state, status: "gameover" };
    }

    case "RESET": {
      return initialState;
    }

    default:
      return state;
  }
}

const KEY_MAP = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

export function useGame({ onTimeExpired } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Keyboard input
  useEffect(() => {
    if (state.status !== "playing") return;
    function handleKey(e) {
      const dir = KEY_MAP[e.key];
      if (!dir) return;
      e.preventDefault();
      dispatch({ type: "INPUT", direction: dir });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state.status]);

  // Auto-advance after success
  useEffect(() => {
    if (state.status !== "success") return;
    const t = setTimeout(() => dispatch({ type: "NEXT" }), 220);
    return () => clearTimeout(t);
  }, [state.status, state.score]);

  // Auto-recover after fail
  useEffect(() => {
    if (state.status !== "fail") return;
    const t = setTimeout(() => dispatch({ type: "RESUME_FROM_FAIL" }), 250);
    return () => clearTimeout(t);
  }, [state.status]);

  // Auto-start infinite mode on mount
  useEffect(() => {
    dispatch({ type: "START", mode: "infinite" });
  }, []);

  const startMode = useCallback((mode) => dispatch({ type: "START", mode }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);
  const inputArrow = useCallback((dir) => dispatch({ type: "INPUT", direction: dir }), []);
  const gameOver = useCallback(() => dispatch({ type: "GAME_OVER" }), []);
  const setFilter = useCallback((filter) => dispatch({ type: "SET_FILTER", filter }), []);

  return { state, startMode, reset, inputArrow, gameOver, setFilter };
}
