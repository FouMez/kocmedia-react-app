import React from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import FORM_RULES from '../helpers.js/formRules';

const AddUser = ({
    visible, handleOk, handleCancel, form,
}) => (
    <Modal
        title="Add a new user"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <Form form={form}>
            <Form.Item
                name="Name"
                placeholder="Full Name"
                rules={[FORM_RULES.required]}
            >
                <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item name="Email" rules={[FORM_RULES.required, FORM_RULES.email]}>
                <Input placeholder="Email Address" />
            </Form.Item>
            <Form.Item name="Phone" rules={[FORM_RULES.required, FORM_RULES.number]}>
                <Input placeholder="Mobile Number" />
            </Form.Item>
        </Form>
    </Modal>
);

AddUser.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
};

export default AddUser;
