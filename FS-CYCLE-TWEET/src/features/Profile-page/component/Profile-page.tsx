import { Box, Image, Skeleton, Spinner, Toast } from '@chakra-ui/react';
import { RightBarMyProfile } from '../../../component/ui/right-bar-my-Profile';
import TabsLayout from '../../../component/ui/item-tab-layout';
import ItemPost from '../../../component/ui/item-post';
import {
  useMediaById,
  useThreadsByUserId,
} from '../../../app/hooks/use-threads';
import { useAppSelector } from '../../../app/hooks/use-store';

export default function MyProfilePage() {
  // Using useParams to get the dynamic ID from the route
  // const media = useAppSelector((state) => state.auth.user.Thread);
  const userId = useAppSelector((state) => state.auth.user.id);
  const { data: threads, isLoading, error } = useThreadsByUserId(userId);
  const {
    data: media,
    isLoading: loadingImages,
    error: mediaError,
  } = useMediaById(Number(userId));

  if (isLoading || loadingImages) return <Spinner />;
  console.log();

  if (error || mediaError)
    return <Toast status="error">Error loading threads</Toast>;

  return (
    <Box
      borderX="1px"
      borderColor="#3F3F3F"
      h="full"
      className=" text-white py-5 px-5 font-['Plus_Jakarta_Sans']"
    >
      <RightBarMyProfile />

      <TabsLayout
        title1={'All Post'}
        title2={'Media'}
        tabContent1={
          <>
            {/* Render threads */}
            {threads?.map((thread: any) => (
              <ItemPost
                key={thread.id}
                username={thread.User?.name || ''}
                handle={thread.User?.username}
                avatarUrl={
                  thread.User?.avatarUrl ||
                  'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
                }
                postTime={new Date(
                  thread?.createdAt || ''
                ).toLocaleTimeString()}
                postContent={thread?.content || ''}
                postImage={thread?.imageUrl}
                likesCount={thread?.likes.length || 0}
                repliesCount={thread?.replies.length || 0}
                postId={thread?.id}
              />
            ))}
          </>
        }
        tabContent2={
          <>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              w={'full'}
              justifyContent={'center'}
              px={1}
              gap={3}
            >
              {media.map((media: any) => (
                <Skeleton
                  isLoaded={!loadingImages}
                  key={media.id}
                >
                  <Image
                    boxSize="155px"
                    objectFit="cover"
                    src={media.imageUrl}
                    alt={`Image from post ${media.id}`}
                  />
                </Skeleton>
              ))}
            </Box>
          </>
        }
      />
    </Box>
  );
}
