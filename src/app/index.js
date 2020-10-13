/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
    message, Layout, Button, Typography, Form,
} from 'antd';
import * as UsersAPI from '../api/users';
import UsersTable from '../components/usersTable';
import './styles.css';
import AddUser from '../components/addUser';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const App = () => {
    const [users, setUsers] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [openAddUser, setOpenAddUser] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (shouldUpdate) {
            (async () => {
                try {
                    const res = await UsersAPI.getAll();
                    setUsers(res.data);
                    setShouldUpdate(false);
                } catch (error) {
                    message.error('Error fetching resources.');
                    console.log({ error });
                }
            })();
        }
    }, [shouldUpdate]);

    const cancelAddUser = () => {
        form.resetFields();
        setOpenAddUser(false);
    };

    const onAddUser = async () => {
        try {
            const values = await form.validateFields();
            UsersAPI.create(values);
            message.success('user created successfuly');
            form.resetFields();
            setOpenAddUser(false);
            setShouldUpdate(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <Header>
                <Title
                    level={2}
                    className="header-title"
                >
                    Koch Media Technical Test
                </Title>
            </Header>
            <Content className="app-content">
                <Button
                    onClick={() => setOpenAddUser(true)}
                    style={{ marginBottom: 24 }}
                    type="primary"
                    size="large"
                >
                    Add User
                </Button>

                <UsersTable
                    originData={users}
                    refreshUserslist={() => {
                        setShouldUpdate(true);
                    }}
                />
                <AddUser
                    handleOk={onAddUser}
                    form={form}
                    handleCancel={cancelAddUser}
                    visible={openAddUser}
                />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Firas Mezghani productions (FouMez) ©2020
            </Footer>
        </Layout>
    );
};

App.propTypes = {};

App.defaultProps = {};

export default App;
