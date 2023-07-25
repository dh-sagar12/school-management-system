import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from '@/components/NavHoverBox';
import { IconType } from 'react-icons';

export interface NavItemProps {
    icon: IconType,
    title: string,
    description: string,
    active?: any,
    navSize: string
}

export default function NavItem({ icon, title, description, active, navSize }: NavItemProps) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            pl={'10px'}
            alignItems={navSize == "small" ? "center" : "flex-start"}
            justifyContent={'center'}
        >
            <Menu placement="right">
                <Link
                    color={active && "blue.500"}
                    p={2}
                    borderRadius={3}
                    _hover={{ textDecor: 'none', backgroundColor: "blue.100" }}
                    w={"100%"}
                >
                    <MenuButton>
                        <Flex alignItems={"Center"}>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.600"} pl={'2px'} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList>
            </Menu>
        </Flex>
    )
}