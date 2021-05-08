import React from 'react';
import { Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import DarkLogo from '../../../assets/dark_logo.svg';
import LightLogo from '../../../assets/light_logo.svg';

const Navbar = props => {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="0.7rem"
        boxShadow="sm"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Image
            boxSize="40px"
            objectFit="cover"
            src={useColorModeValue(DarkLogo, LightLogo)}
            alt="logo"
          />
        </Flex>

        {
          //TODO conditional render this whn logged in
          /* <Box
          display="flex"
          width="auto"
          alignItems="center"
          flexGrow={1}
          color="green.400"
        >
          <MenuItems onClick={() => props.setPage('planets')}>
            Planets
          </MenuItems>
          <MenuItems onClick={() => props.setPage('people')}>People</MenuItems>
        </Box> */
        }
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </>
  );
};

export default Navbar;
