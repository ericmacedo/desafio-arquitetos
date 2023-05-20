import HTTP from "../../services/HTTP";
import User from "../../types/user";
import { Form, Modal, Input, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export default function ServiceModal({
  open, employees, handleOk, confirmLoading, handleCancel
}: {
  employees: User[],
  handleOk: any,
  open: boolean,
  confirmLoading: boolean,
  handleCancel: any
}) {
  const [form] = Form.useForm<any>();
	
  return (
		<Modal
      title="Cadastro de ordem de serviço"
      open={open}
      onOk={() => handleOk(form.getFieldsValue())}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="service"
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >

        <Form.Item
          name="description"
          label="Descrição"
          rules={[
            {
              required: true,
              type: 'string',
              message: 'Por favor, forneça uma descrição!',
            }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="employee"
          label="Funcionário"
          rules={[{ required: true, message: 'Por favor, selecione um funcionário!' }]}
        >
          <Select placeholder="Selecione um funcionário">
            {
              employees.map((employee: User) => {
                return (
                  <Option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.name}
                  </Option>)
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
	);
}
