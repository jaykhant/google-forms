import React from 'react'
import ResponseList from '../components/Form/ResponseList';
import ManageQuestion from '../components/Form/ManageQuestion';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const ManageForm = () => {
    return (
        <>
            <Tabs variant="unstyled">
                <TabList justifyContent={'center'} bg={'white'}>
                    <Tab>Questions</Tab>
                    <Tab>Responses</Tab>
                </TabList>
                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="blue.500"
                    borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel p={0}>
                        <ManageQuestion />
                    </TabPanel>
                    <TabPanel p={0}>
                        <ResponseList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ManageForm;
