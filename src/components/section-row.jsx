export function SectionRow({ title, description, children }) {
  return (
    <>
      <div className="sm:hidden px-8 py-4 space-y-1">
        <div className="text-gray-700">
          {title}
        </div>
        <div className="text-xs text-gray-500">
          {description}
        </div>
      </div>
      <div className="bg-gray-200 w-full flex text-gray-700 border-b border-b-gray-300">
        <div className="text-right hidden sm:block w-1/3">
          <div className="p-8 space-y-2">
            <div className="text-xl">
              {title}
            </div>
            <div className="text-xs text-gray-600 flex justify-end">
              <div className="max-w-[10rem]">
                {description}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full sm:w-2/3">
          <div className="px-8 py-4 sm:py-8">
            <div className="max-w-[30rem]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}