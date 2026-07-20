"use client";
import { useState, useEffect } from "react";

export function CourseCount({ fallback = 230 }: { fallback?: number }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/courses/count")
      .then(r => r.json() as Promise<{ count: number }>)
      .then(d => setCount(d.count))
      .catch(() => setCount(fallback));
  }, [fallback]);

  return <>{count ?? fallback}</>;
}
