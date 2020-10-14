/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import {
    Button, Form, message, Popconfirm, Table, Popover,
} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import EditableCell from './editableCell';
import { update, remove } from '../api/users';

const prepareConsultContent = (record) => {
    const handleClose = () => {
        const elem = document.getElementById(record._id);
        elem.click();
    };

    return (
        <div>
            <p>
                <b> Name:&nbsp; </b>
                {record.Name}
            </p>
            <p>
                <b> Email:&nbsp; </b>
                {record.Email}
            </p>
            <p>
                <b> Phone:&nbsp; </b>
                {record.Phone}
            </p>
            <hr />
            <Button type="link" onClick={() => handleClose()}>
                Close
            </Button>
        </div>
    );
};

prepareConsultContent.propTypes = {
    record: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Phone: PropTypes.string.isRequired,
    }).isRequired,
};

const UsersTable = ({ originData, refreshUserslist }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const whatever = useRef();

    useEffect(() => {
        setData(originData);
    }, [originData]);

    const isEditing = record => record._id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            Name: '',
            Email: '',
            Phone: '',
            ...record,
        });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item._id);

            if (index > -1) {
                try {
                    const item = newData[index];
                    const newItem = { ...item, ...row };
                    const res = await update(key, newItem);

                    if (res.data) {
                        newData.splice(index, 1, newItem);
                        setData(newData);
                        setEditingKey('');
                        message.success('User updated successfully.');
                    }
                } catch (error) {
                    message.error('Error while updating this user.');
                    console.log({ error });
                }
            } else {
                message.error('An error occured while editing this user.');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const removeUser = async (id) => {
        try {
            await remove(id);
            message.success('user deleted successfully');
            refreshUserslist();
        } catch (error) {
            message.error('error removing this user');
            console.log({ error });
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            editable: true,
        },
        {
            title: 'Email Address',
            dataIndex: 'Email',
            editable: true,
        },
        {
            title: 'Mobile Number',
            dataIndex: 'Phone',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (_, record) => (isEditing(record) ? (
                <span>
                    <Button
                        onClick={() => save(record._id)}
                        type="primary"
                        ghost
                        style={{
                            marginRight: 8,
                        }}
                    >
                        Save
                    </Button>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <Button danger>Cancel</Button>
                    </Popconfirm>
                </span>
            ) : (
                <div>
                    <Popover
                        trigger="click"
                        // eslint-disable-next-line max-len
                        content={() => prepareConsultContent(record, whatever)}
                    >
                        <Button
                            id={record._id}
                            className="table-action-button"
                            type="primary"
                            ghost
                            disabled={editingKey !== ''}
                            onClick={() => {}}
                        >
                            <EyeOutlined className="icon-button" />
                            Consult
                        </Button>
                    </Popover>
                    <Button
                        className="table-action-button success-button"
                        type="primary"
                        disabled={editingKey !== ''}
                        onClick={() => edit(record)}
                    >
                        <EditOutlined className="icon-button" />
                        Edit
                    </Button>
                    <Popconfirm
                        onConfirm={() => removeUser(record._id)}
                        title="Are you sure you want to delete this user?"
                    >
                        <Button
                            className="table-action-button"
                            danger
                            disabled={editingKey !== ''}
                        >
                            <DeleteOutlined className="icon-button" />
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            )),
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                validator: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                rowKey="_id"
                dataSource={data}
                columns={mergedColumns}
                rowSelection={{
                    getCheckboxProps: record => ({
                        name: record.name,
                    }),
                    hideSelectAll: true,
                }}
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

UsersTable.propTypes = {
    originData: PropTypes.array.isRequired,
    refreshUserslist: PropTypes.func.isRequired,
};

export default UsersTable;
