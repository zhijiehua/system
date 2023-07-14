/*
 * @Description: 搜索输入框
 * @Author: huazj
 * @Date: 2023-04-09 20:02:51
 * @LastEditTime: 2023-04-09 20:35:46
 * @LastEditors: huazj
 */
import { Button, Col, Form, Input, Row, Select } from 'antd';
const SearchForm: React.FC = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  /**
   * @description: 查询
   * @return {*}
   * @param {any} values
   */  
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  /**
   * @description: 重置
   * @return {*}
   */  
  const handlleReset = () => {
    form.resetFields();
  }

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            name='filed1'
            label=''>
              <Input placeholder="请输入设备名称、设备唯一标识搜索" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name='filed2'
            label=''>
              <Select placeholder="请选择">
                {[{label: 'hahha', value: '1'}].map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
              </Select>
          </Form.Item>
        </Col>
        <Button type='primary' htmlType="submit">查 询</Button>
        <Button style={{marginLeft: '10px'}} onClick={handlleReset}>重 置</Button>
      </Row>
    </Form>
  )
}

export default SearchForm;