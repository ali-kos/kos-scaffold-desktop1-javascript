import React from 'react';
// import PropTypes from 'prop-types';
import { Input, Radio, Button } from 'antd';
// import PropTypes from 'prop-types';
import { AutoWrapper } from '@/components/AutoWrapper';
import { Form, Field, ToolbarField } from '@/common/utils/kos-form-antd';
import model from './model';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
@AutoWrapper({ KOSconfig: { model } })
class Workspace extends React.Component {
  /*
   * 用于直接的事件绑定提交逻辑
   *
   * */
  handleSubmit() {
    const { dispatch } = this.props;
    const { getNamespace } = this.props;

    const result = Form.validate(getNamespace(), 'addForm', (results) => {
      results &&
        dispatch({
          type: 'save',
          payload: {
            result,
          },
        });
    });
  }
  submitForm(formData) {
    const { dispatch } = this.props;
    dispatch({
      type: 'save',
      payload: {
        formData,
      },
    });
  }
  render() {
    console.log('this.props ==>', this.props);
    // const { title, dispatch } = this.props;
    return (
      <Form name="addForm" onSubmit={formData => this.submitForm(formData)}>
        <Field label="页面名称：" field="page_name">
          <Input
            onChange={() => {
              console.log('onChange');
            }}
          />
        </Field>
        <Field label="页面类型：" field="page_type">
          <RadioGroup>
            <RadioButton value="pc">PC</RadioButton>
            <RadioButton value="h5">H5</RadioButton>
          </RadioGroup>
        </Field>
        <Field label="说明：" field="page_desc">
          <Input.TextArea rows={4} />
        </Field>
        <ToolbarField>
          <Button type="primary" htmlType="submit">
            新增
          </Button>
        </ToolbarField>
      </Form>
    );
  }
}

export default Workspace;
