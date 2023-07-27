import React, { useContext, useState } from 'react'
import {
    Flex,
    IconButton

} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome
} from 'react-icons/fi'
import NavItem from './NavItems'
import { AuthContext } from '@/Context/AuthContext'



export default function Sidebar() {
    

    const  { usermeta }  = useContext(AuthContext)

    console.log(usermeta);
    

    const [navSize, changeNavSize] = useState("large")
    return (
        <>
            <Flex
                h="100vh"
                w={navSize == "small" ? "75px" : "200px"}
                transition={'all'}
                justifyContent="space-between"
            >


                <Flex
                    // p="5%"
                    px={'10%'}
                    className='shadow-xl border-r-3'
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    as="nav"
                >

                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." active />
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />

                </Flex>
                <IconButton
                    paddingTop={'10'}
                    background="none"
                    _hover={{ background: 'none' }}
                    icon={<FiMenu fontSize={'20px'} />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")

                        else
                            changeNavSize("small")
                    }}
                    aria-label={''}
                />

            </Flex>

        </>
    )
}