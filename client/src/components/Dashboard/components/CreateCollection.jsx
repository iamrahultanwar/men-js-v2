import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

import { FaPlus } from 'react-icons/fa';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

const CreateCollection = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { collectionsHandler } = props;

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const toast = useToast();

  const CollectionSchema = Yup.object().shape({
    name: Yup.string().required('Required collection name'),
  });

  return (
    <>
      <Button float="right" m="0.5rem" colorScheme="green" onClick={onOpen}>
        <FaPlus style={{ marginRight: '0.5rem' }} />
        Create Collection
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent style={{ opacity: 1 }}>
          <ModalHeader>Create new collection</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{ name: '' }}
            onSubmit={(values, actions) => {
              if (values.name !== '') {
                collectionsHandler(values.name);

                actions.setSubmitting(true);
                onClose();
                toast({
                  title: `Collection created!`,
                  status: 'success',
                  isClosable: true,
                });
              } else {
                toast({
                  title: `Please enter valid name`,
                  status: 'error',
                  isClosable: true,
                });
                actions.setSubmitting(false);
              }
            }}
            validationSchema={CollectionSchema}
          >
            {props => (
              <>
                <Form>
                  <ModalBody pb={6}>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          isRequired
                        >
                          <FormLabel htmlFor="name">
                            Enter collection name
                          </FormLabel>
                          <Input
                            ref={initialRef}
                            {...field}
                            id="name"
                            placeholder="Collection name"
                          />
                          {form.errors.name && form.touched.name && (
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    </Field>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      mr={3}
                      colorScheme="green"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Create
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Form>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCollection;
