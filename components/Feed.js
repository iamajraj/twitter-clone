import { SparklesIcon } from '@heroicons/react/outline';

export default function Feed() {
  return (
    <div className="xl:ml-[290px] border-x border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 border-b bg-white z-50 border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect">
          <SparklesIcon className="h-5" />
        </div>
      </div>
    </div>
  );
}
