import { Genders, UserRoles } from '../../types/user';
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from 'antd';

const { Option } = Select;

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

export default function RegisterModal({
  open, handleOk, confirmLoading, handleCancel
}: {
  open: boolean,
  handleOk: any,
  confirmLoading: boolean,
  handleCancel: any
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Cadastro de usuário"
      open={open}
      onOk={() => handleOk(form.getFieldsValue())}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              type: 'string',
              message: 'O nome fornecido não é válido!',
            },
            {
              required: true,
              message: 'Por favor, preencha seu nome!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'O email fornecido não é válido!',
            },
            {
              required: true,
              message: 'Por favor, forneça seu email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={[
            {
              required: true,
              message: 'Por favor, forneça uma senha!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar senha"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor, confirme sua senha!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas são correspondem!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefone"
          rules={[{
            pattern: new RegExp(/^[0-9]{10,11}$/),
            required: true,
            message: 'Por favor, forneça seu telefone!'
          }]}
        >
          <Input addonBefore={(
            <Form.Item name="prefix" noStyle>
              <Select style={{ width: 70 }}>
                <Option value="55">+55</Option>
              </Select>
            </Form.Item>
          )} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="birth"
          label="Data de nascimento"
          rules={[{
            required: true,
            message: 'Por favor, fornceça sua data de nascimento!'
          }]}
        >
          <DatePicker format={"MM/DD/YYYY"} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gênero"
          rules={[{ required: true, message: 'Por favor, selecione seu gênero!' }]}
        >
          <Select placeholder="Selecione seu gênero">
            {
              Genders.map((gender: string) => {
                return (<Option key={gender} value={gender}>{ gender }</Option>)
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="role"
          label="Função"
          rules={[{
            required: true,
            message: 'Por favor, selecione sua função!'
          }]}
        >
          <Select placeholder="Selecione sua função">
            {
              UserRoles.map((role: string) => {
                return (<Option key={ role } value={role}>{ role }</Option>)
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
