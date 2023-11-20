import React from 'react'
import PropTypes from 'prop-types'
import ResponseList from '../components/Form/ResponseList';
import ManageQuestion from '../components/Form/ManageQuestion';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const ManageForm = (loadMore) => {
    return (
        <>
            <Tabs variant="unstyled" >
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
                    <TabPanel p={0} display={'flex'} justifyContent={'center'}>
                        <ManageQuestion />
                    </TabPanel>
                    <TabPanel p={0}>
                        <ResponseList loadMore={loadMore} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

ManageForm.propTypes = {
    loadMore: PropTypes.bool,
}

export default ManageForm;
