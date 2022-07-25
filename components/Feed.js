import { SparklesIcon } from '@heroicons/react/outline';
import Input from './Input';
import Post from './Post';

export default function Feed() {
  const posts = [
    {
      id: '1',
      name: 'Akmal Raj',
      username: 'akmalraj',
      userImg:
        'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
      postImg:
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
      text: 'nice view of nature!',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      name: 'Jas',
      username: 'jasjas',
      userImg:
        'https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000',
      postImg:
        'https://images.unsplash.com/photo-1600195077909-46e573870d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      text: 'learning is good!',
      timestamp: '1 days ago',
    },
  ];
  return (
    <div className="xl:ml-[290px] border-x border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 border-b bg-white z-50 border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
