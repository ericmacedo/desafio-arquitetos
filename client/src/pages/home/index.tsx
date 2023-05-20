import User from "../../types/user";
import Service, { ServiceStatus, ServiceStatusOptions } from "../../types/service";
import { Button, Dropdown, Layout, Space, Typography, FloatButton, message, List, Skeleton, Radio } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from "react";
import ServiceModal from "./ServiceModal";
import HTTP from "../../services/HTTP";

const { Header, Content, Footer } = Layout;

export default function Home({
  user, onLogout
}: {
  user: User, onLogout: any
}) {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<User[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi,contextHolder] = message.useMessage();

	const handleOk = useCallback((data: any) => {
    setConfirmLoading(true);
    const employeeId = Number(data.employee);
    
    data.client = user;
    data.employee = employees.find(
      (employee: User) => employee.id === employeeId
    );
      
    console.log(data);
		
    HTTP.post('/service', data)
      .then((_: any) => {        
        setConfirmLoading(false);
        setOpen(false);

        fetchServices();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const fetchEmployees = useCallback(() => {
    HTTP.get('/user', { params: { role: "Funcionário" } })
      .then((response: any) => {
        setInitLoading(false);
        setEmployees(response.data);
      });
  }, []);

  const fetchServices = useCallback(() => {
    let params:any = {};
    params[
      (user.role === 'Cliente' ? 'client' : 'employee') + '.id'
    ] = user.id;

    HTTP.get('/service', { params })
      .then((response: any) => {
        setInitLoading(false);
        setServices(response.data);
      });
  }, []);

  const deleteServiceHelper = useCallback((id: number) => {
    window.confirm(
      "Deseja realmente remover esta ordem de serviço?"
    ) && HTTP.delete(`/service/${id}`).then((_: any) => { fetchServices(); });
  }, []);

  const updateServiceHelper = useCallback((id: number, status: ServiceStatus) => {
    HTTP.patch(`/service/${id}`, { status })
      .then((_: any) => { fetchServices(); });
  }, []);

  const fetchData = () => {
    fetchEmployees();
    fetchServices();
  };

  useEffect(() => {
    fetchData();
  }, []);
  
	return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
    }}>
			<Layout className="layout">
        <Header style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography>
           <Typography.Title level={3} style={{
            color: "white",
          }} >Arquitetos</Typography.Title>
          </Typography>
          <Dropdown menu={{
            items: [
              {
                key: '1',
                label: (
                  <Button type="link" onClick={onLogout}>
                    Logout
                  </Button>
                )
              }
            ]
          }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                { user.name }
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content style={{
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <List
            style={{ width: '100%' }}
            pagination={{ position: "bottom", align: "center" }}
            dataSource={services}
            renderItem={(item, index) => (
              <List.Item
                actions={
                  user.role === "Cliente"
                    ? [
                        <Button type="link" size="small">Editar</Button>,
                        <Button
                          type="link"
                          size="small"
                          onClick={() => { deleteServiceHelper(item.id) }}
                        >Remover</Button>
                      ]
                    : [
                      <Radio.Group
                        value={item.status}
                        size="small"
                        onChange={(e) => updateServiceHelper(item.id, e.target.value)}
                      >
                        {["Recusado", "Aceito"].map((option, index) => {
                          return (
                            <Radio.Button key={index} value={option}>
                              {option}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    ]
                }
              >
                {
                  item.status === "Solicitado"
                  && <List.Item.Meta description={item.status} />
                }
                { item.description }
              </List.Item>
            )}
          />
          {user.role === "Cliente" && <FloatButton
                                        shape="square"
                                        type="primary"
                                        style={{ right: 24 }}
                                        icon={(<PlusOutlined />)}
                                        onClick={() => { setOpen(true) }}/> }
          <ServiceModal
            open={open}
            handleOk={handleOk}
            employees={employees}
            confirmLoading={false}
            handleCancel={() => { setOpen(false) }}
          />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Eric Macedo Cabral
        </Footer>
			</Layout>
		</div>
	)
}
