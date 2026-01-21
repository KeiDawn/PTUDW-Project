export default function Pagination({
  page,
  totalPages,
  onPageChange
}) {
  const goPrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const goNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={goPrev}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &laquo;
      </button>

      <span>
        Page <strong>{page}</strong> / {totalPages}
      </span>

      <button
        onClick={goNext}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
}
