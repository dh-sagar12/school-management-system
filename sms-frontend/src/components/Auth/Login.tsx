'use client'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
    FormErrorMessage,
    useBoolean,
    Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Login } from '@/authTypes';
import { LoginFormValidationSchema } from '@/validationSchema/authFormValidator';
import APIHandlers from '@/utils/APIHandlers';
import { useToast } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { BranchesDropdownType } from '@/coreTypes'



interface Prop {
    Branches: BranchesDropdownType[]
}


const Login = (prop: Prop) => {


    const InitialValue: Login = {
        email: '',
        password: '',
        branch_id: prop.Branches[0].id
    }

    const [loading, setLoading] = useBoolean()

    const toast = useToast()

    const router = useRouter()
    const searchParams = useSearchParams()

    const form = useFormik({
        initialValues: InitialValue,
        validationSchema: LoginFormValidationSchema,
        onSubmit: (values) => {
            console.log(values);

            setLoading.on()
            APIHandlers.post('/api/auth/login/', values).then(responseData => {                
                setLoading.off()
                toast({
                    title: 'Logged In Successfully!!',
                    position: 'top-right',
                    isClosable: true,
                    colorScheme: 'green'
                })

                const return_url: string = searchParams.get('ReturnUrl') ?? '/'
                router.refresh()
                router.push(return_url)

            }).catch((error) => {
                console.log(error);

                toast({
                    title: 'Invalid Credentials',
                    position: 'top-right',
                    isClosable: true,
                    colorScheme: 'red'
                })
                setLoading.off()

            })

        }
    })

    const handleBranchChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        form.values.branch_id = parseInt(event.target.value)
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <form onSubmit={form.handleSubmit}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Login in</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4} >
                            <FormControl id="email"
                                isInvalid={form?.touched.email && form?.errors?.email ? true : false}
                            >
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    name='email'
                                    value={form.values.email}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>


                            <FormControl id="password"
                                isInvalid={form?.touched.password && form?.errors?.password ? true : false}
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name='password'
                                    value={form.values.password}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}

                                />
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="branch_id"
                            >
                                <FormLabel>Branch</FormLabel>
                                <Select name='branch_id'
                                    onChange={handleBranchChange}
                                >
                                    {
                                        prop.Branches.map((elem) => {
                                            return <option value={elem.id} key={elem.id}>{elem.org_code} {elem.nick_name}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    isLoading={loading}
                                    loadingText='Logging...'
                                    type='submit'
                                    className={'bg-blue-700'}
                                    bgColor={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Flex>
    );
}


export default Login