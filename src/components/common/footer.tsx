import { Box, Container, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box bg={'gray.50'} color={'gray.700'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        wordSpacing={4}
        justifyContent={{ base: 'center', md: 'space-between' }}
        alignItems={{ base: 'center', md: 'center' }}
      >
        <Text>
          © {new Date().getFullYear()} PortalLoker. All rights reserved
        </Text>
        <Stack direction={'row'} wordSpacing={6}>
          <a href="#">
            <Image
              src="/facebook-icon.svg"
              width={40}
              height={40}
              alt="Facebook"
            />
          </a>
          <a href="#">
            <Image
              src="/twitter-icon.svg"
              width={40}
              height={40}
              alt="Twitter"
            />
          </a>
          <a href="#">
            <Image
              src="/instagram-icon.svg"
              width={40}
              height={40}
              alt="Instagram"
            />
          </a>
        </Stack>
      </Container>
    </Box>
  );
}
