import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Container,
  Flex,
  useToast,
  Heading,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const toast = useToast();
  return (
    <React.Fragment>
      <Container>
        <Flex
          minHeight="80vh"
          width="full"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            border="1px solid"
            borderColor="gray.100"
            boxShadow="sm"
            padding="2rem"
            borderRadius="lg"
            textAlign="center"
            width="100%"
            maxWidth="450px"
          >
            <Heading as="h4" size="lg">
              Login
            </Heading>
            <Box mt="3">
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                  if (
                    values.email === 'admin@menjs.com' &&
                    values.password === 'admin1708'
                  )
                    setTimeout(() => {
                      history.replace('/dashboard');
                    }, 1000);
                  else {
                    toast({
                      title: `Invalid credentials!`,
                      status: 'error',
                      isClosable: true,
                    });
                    actions.setSubmitting(false);
                  }
                }}
                validationSchema={SignupSchema}
              >
                {props => (
                  <Form>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                          isRequired
                        >
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Input {...field} id="email" placeholder="email" />
                          {form.errors.email && form.touched.email && (
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input
                            {...field}
                            type="password"
                            id="password"
                            placeholder="password"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      mx="auto"
                      colorScheme="green"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Flex>
      </Container>
    </React.Fragment>
  );
};

export default Login;
