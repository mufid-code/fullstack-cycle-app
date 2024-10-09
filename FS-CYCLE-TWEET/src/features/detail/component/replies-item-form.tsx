import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  FormControl,
  Spinner,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../app/hooks/use-store';
import { usePostReply } from '../hooks/use-post-replies';
import { useParams } from 'react-router-dom';

export default function RepliesItemForm({
  placeholder,
  buttonTitle,
}: {
  placeholder: string;
  buttonTitle: string;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const { id } = useParams<{ id: string }>(); // Assuming id comes from route params
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    usePostReply(id);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        display={'flex'}
        alignItems={'center'}
        gap={4}
        justifyContent={'space-between'}
        borderBottom={'solid 1px'}
        borderColor={'brand.borderAbu'}
        p={4}
      >
        <Avatar
          src={user?.avatarUrl}
          name={user?.name}
          borderColor={'brand.backgroundBox'}
          height={'40px'}
          width={'40px'}
          rounded={'full'}
          objectFit="cover"
        />
        <Box flex={'1'}>
          <Input
            {...register('content')}
            variant={'unstyled'}
            border={'none'}
            placeholder={placeholder}
          />
          {errors.content && (
            <Text
              fontSize={13}
              color={'red'}
            >
              * {errors.content.message}
            </Text>
          )}
        </Box>
        <Flex
          alignItems={'center'}
          gap={4}
        >
          <Image
            src="/src/assets/icons/gallery-add-logo.png"
            alt="gallery"
            height={'24px'}
          />
          <Button
            type="submit"
            backgroundColor={'tweet.green'}
            color={'tweet.putih'}
            height={'33px'}
            justifyItems={'center'}
            rounded={'full'}
            alignItems={'center'}
            padding={4}
            fontSize={'14px'}
            fontWeight={700}
            lineHeight={'17px'}
          >
            {isSubmitting ? <Spinner /> : `${buttonTitle}`}
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}
