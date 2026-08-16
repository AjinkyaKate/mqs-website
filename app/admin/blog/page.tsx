export default function AdminBlogPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">
        Blog
      </h1>
      <div className="mt-10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-20">
        <div className="text-4xl text-gray-300">&#9998;</div>
        <p className="mt-3 text-sm font-medium text-gray-400">Under development — Phase 2</p>
        <p className="mt-1 text-xs text-gray-300">Blog management will be available in the next release</p>
      </div>
    </div>
  );
}
