import { useCallback, useState } from "react";

export function useProgress() {
  const [progressTitle, setProgressTitle] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  const progress = useCallback(
    async <Fn extends () => Promise<any>>({
      callback,
      title,
      successValueOffset,
    }: {
      callback: Fn;
      title?: string;
      successValueOffset?: number;
    }) => {
      if (title) {
        setProgressTitle(title);
      }
      const result = await callback();
      if (successValueOffset) {
        setProgressValue((prev) => Math.min(prev + successValueOffset, 1));
      }
      return result as ReturnType<Fn>;
    },
    []
  );

  return {
    progress,
    progressTitle,
    progressValue,
  };
}
