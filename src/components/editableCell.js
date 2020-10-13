/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import FORM_RULES from '../helpers.js/formRules';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {
    const rules = [FORM_RULES.required];

    switch (dataIndex) {
        case 'Email':
            rules.push(FORM_RULES.email); break;
        case 'Phone':
            rules.push(FORM_RULES.number); break;
        default: break;
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={rules}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

EditableCell.propTypes = {
    editing: PropTypes.bool,
    dataIndex: PropTypes.oneOf(['Email', 'Phone', 'Action', 'Name']),
    title: PropTypes.string,
    record: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Phone: PropTypes.string.isRequired,
    }),
    index: PropTypes.number,
    children: PropTypes.node,
};


EditableCell.defaultProps = {
    children: null,
    editing: null,
    dataIndex: null,
    record: null,
    index: null,
    title: '',
};


export default EditableCell;
