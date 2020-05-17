import React, { useContext, useState } from 'react';
import { Form,Row, Input, DatePicker, Avatar, Button } from 'antd';
import { UserOutlined, FileImageOutlined, CloseOutlined, CheckOutlined, UndoOutlined } from '@ant-design/icons';
import CountrySelect from './CountrySelect'
import moment from 'moment';
import DefaultUserData from '../Store'
import './Singleuser.less';
const defaultSpace = 8;
const Singleuser = (props) => {
    const {removeUser,editUser } = useContext(DefaultUserData)
    const [formData, setFormData] = useState( props )
    const [showUrl, setShowUrl] = useState(false)
    const [buttonPressed, setButtonPressed] = useState({ remove: false, edit: false })
    const handleInput = value => {
        setFormData(param => ({ ...param, name: value }))
    };
    const handleAddressChange = newUrl => {
        if (newUrl === "" || (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(newUrl)) {
            setFormData(param => ({ ...param, profile: newUrl }))
        }
    }
    return (
        <div className="single-user-container" onMouseLeave={() => setButtonPressed(param => ({ ...param, remove: false }))}>
            <Row justify="center" align="top">
                <Form labelCol={{ span: defaultSpace }} wrapperCol={{ span: defaultSpace }} className="user-flex-container">
                    <Form.Item style={{ marginLeft: defaultSpace }} >
                        <Avatar src={formData.profile} onClick={() => setShowUrl(showUrl ? false : true)} className="cursor-pointer" />
                    </Form.Item>
                    <Form.Item style={{ marginLeft: defaultSpace }} className={showUrl ? "" : "hide"} >
                        <Input className="force-align-center" disabled={!buttonPressed.edit} style={{ width: 283 }} onChange={e => handleAddressChange(e.target.value)} value={formData.profile} placeholder="image url" suffix={<FileImageOutlined />} />
                    </Form.Item>
                    <div className="username-country-container">
                        <Form.Item style={{ marginLeft: defaultSpace }} className={showUrl ? "hide" : ""}>
                            <Input className="force-align-center" disabled={!buttonPressed.edit} style={{ width: 120 }} value={formData.name} placeholder="username" onChange={(e) => handleInput(e.target.value)} suffix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item style={{ marginLeft: defaultSpace }} className={showUrl ? "hide" : ""}>
                            <CountrySelect placeholder="Country" disabled={!buttonPressed.edit} value={formData.country} onChange={(value) => setFormData(param => ({ ...param, country: value }))} />
                        </Form.Item>
                    </div>
                    <Form.Item style={{ marginLeft: defaultSpace }} >
                        <DatePicker className="force-align-center" disabled={!buttonPressed.edit}  style={{ width: 120 }} onChange={(value) => setFormData(param => ({ ...param, birthday: value }))} value={formData.birthday ? moment(formData.birthday, 'DD-MM-YYYY') : ""} format={'D/M/YYYY'} />
                    </Form.Item>
                    <div className="user-buttons-container">
                        <Form.Item style={{ marginLeft: defaultSpace }}>
                            <Button shape="round" type="primary" htmlType="submit" disabled={buttonPressed.edit && (!formData.country || !formData.name || !formData.birthday)} icon={buttonPressed.edit ? <CheckOutlined /> : <></>} style={{ width: 70 }} onClick={() => {
                                if (buttonPressed.edit) {
                                    setButtonPressed(param => ({ ...param, edit: false }))
                                    editUser(formData)
                                } else {
                                    setButtonPressed(param => ({ ...param, edit: true }))
                                }
                            }}>
                                {buttonPressed.edit ? "" : "Edit"}
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginLeft: defaultSpace }} >
                            <Button shape="round" type="danger" style={{ width: 70 }} icon={buttonPressed.edit ? <UndoOutlined /> : (buttonPressed.remove ? <CloseOutlined /> : <></>)} onClick={() => {
                                if (buttonPressed.edit) {
                                    setFormData(props)
                                    setButtonPressed(({ edit: false, remove: false }))
                                } else if (buttonPressed.remove) {
                                    removeUser(props.id)
                                } else {
                                    setButtonPressed(param => ({ ...param, remove: true }))
                                }
                            }}>
                                {buttonPressed.edit ? "" : (buttonPressed.remove ? "" : "Delete")}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Row>
        </div>
    );
}
export default Singleuser;