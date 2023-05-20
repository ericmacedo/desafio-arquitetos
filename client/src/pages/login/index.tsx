import RegisterModal from "./register";
import { Fragment, useCallback, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import User from "../../types/user";
import { Navigate } from "react-router-dom";
import HTTP from "../../services/HTTP";

export interface Credentials {
  email: string;
  password: string;
}

export default function Login() {
	const [user, setUser] = useState<User | null>(null);
	const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi,contextHolder] = message.useMessage();


	const handleOk = useCallback((data: any) => {
		setConfirmLoading(true);
		
    HTTP.post('/user', data)
      .then((response: any) => {
        setUser(response.data);
        
        setConfirmLoading(false);
        setOpen(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  
  const doLogin = (credentias: Credentials) => {
    let message: string;
    HTTP.post('/login', credentias)
      .then(({ data }: {data: User}) => {
        if (data) {
          setUser(data);
        } else {
          message = 'Usuário ou senha inválidos!';
        }
      })
      .catch((error: any) => {
        message = 'Ocorreu um erro ao tentar efetuar o login!';
      })
      .finally(() => {
        if (message !== undefined) {
          messageApi.open({ type: 'error', content: message});
        }
      });
  };

	return (
    <div>
      {contextHolder}
			{
				user !== null
					? <Navigate replace to='/' state={{ user }} />
					: <Fragment>
							<Form
								name="normal_login"
								className="login-form"
								initialValues={{ remember: true }}
								onFinish={doLogin}
							>
								<Form.Item
									name="email"
									rules={[{ required: true, message: 'Por favor, informe seu email!' }]}
								>
									<Input
										prefix={<UserOutlined className="site-form-item-icon" />}
										placeholder="Email" />
								</Form.Item>
								<Form.Item
									name="password"
									rules={[{ required: true, message: 'Por favor, informe sua senha!' }]}
								>
									<Input
										prefix={<LockOutlined className="site-form-item-icon" />}
										type="password"
										placeholder="Senha"
									/>
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button"
									>
										Entrar
								</Button>
								<span style={{ marginLeft: 10 }}>ou</span>
								<Button
									onClick={() => setOpen(true)}
									type="link"
									size="small"
								>
									Cadastre-se agora!
								</Button>
								</Form.Item>
							</Form>
							<RegisterModal
								open={open}
								handleOk={handleOk}
								confirmLoading={confirmLoading}
								handleCancel={() => setOpen(false)}
							/>
					</Fragment>
			}
		</div>
	)
}
