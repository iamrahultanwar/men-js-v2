import React from 'react';
import {
  GridItem,
  Grid,
  Container,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Divider,
  Box,
  Heading,
} from '@chakra-ui/react';
import CreateCollection from './components/CreateCollection';

import { MdCheckCircle } from 'react-icons/md';

const DashBoard = () => {
  const [collections, setCollections] = React.useState([]);

  const collectionsHandler = data => {
    setCollections([...collections, data]);
  };
  return (
    <React.Fragment>
      <Container mt="1rem" maxW="100%">
        <Grid h="90vh" minH="300px" templateColumns="200px auto" gap={1}>
          <GridItem
            colSpan={1}
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius="sm"
            padding="0.8rem"
          >
            <Heading as="h4" size="md" mb="1rem" textAlign="left">
              NAVIGATION
            </Heading>
            {collections.length > 0 ? (
              <Box>
                <List spacing={3} textAlign="left">
                  {collections.map((item, idx) => (
                    <>
                      <ListItem
                        key={idx}
                        textOverflow="ellipsis"
                        overflow="auto"
                      >
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        {item}
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              </Box>
            ) : (
              <p>No collections!</p>
            )}
          </GridItem>
          <GridItem
            colSpan={'auto'}
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius="sm"
          >
            <CreateCollection collectionsHandler={collectionsHandler} />
          </GridItem>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default DashBoard;
