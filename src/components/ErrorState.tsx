type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      className="card border-red-200 bg-red-50 dark:bg-red-950/30"
    >
      <div className="flex items-center justify-between">
        <p className="text-red-700 dark:text-red-300">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-white"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
