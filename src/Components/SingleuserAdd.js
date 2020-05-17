import React, { useContext, useState } from 'react';
import { Form, Select, Row, Input, DatePicker, Avatar, Button, Typography } from 'antd';
import { UserOutlined, FileImageOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import CountrySelect from './CountrySelect'
import DefaultUserData from '../Store'
import moment from 'moment';
import './SingleuserAdd.less';
import '../globalStyles.less'
const defaultSpace = 8;
const SingleuserAdd = (props) => {
    const { data,addUser } = useContext(DefaultUserData)
    const [formData, setFormData] = useState( props )
    const [showUrl, setShowUrl] = useState(false)
    const handleInput = value => {
        setFormData(param => ({ ...param, name: value }))
    };
    const handleAddressChange = newUrl => {
        if (newUrl === "" || (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(newUrl)) {
            setFormData(param => ({ ...param, profile: newUrl }))
        }
    }
    const addButtonActive={ width: 148,background:"#1989f1",borderColor:"#1989f1",color:"white"}
    const addButtonDisabled={ width: 148,background:"#ccc",borderColor:"#ccc",color:"white"}
    return (
        <div className="single-user-add-container">
            <Row justify="center" align="top">
                <Form labelCol={{ span: defaultSpace }} wrapperCol={{ span: defaultSpace }} className="user-flex-container">
                    <Form.Item style={{ marginLeft: defaultSpace }}>
                        <Avatar src={formData.profile} onClick={() => setShowUrl(showUrl ? false : true)} className="cursor-pointer" icon={showUrl ? <ArrowLeftOutlined /> : <FileImageOutlined />} />
                    </Form.Item>
                    <Form.Item style={{ marginLeft: defaultSpace }} className={showUrl ? "" : "hide"} >
                        <Input className="force-align-center" style={{ width: 283 }} onChange={e => handleAddressChange(e.target.value)} value={formData.profile} placeholder="image url" suffix={<FileImageOutlined />} />
                    </Form.Item>
                    <div className="username-country-container">
                        <Form.Item style={{ marginLeft: defaultSpace }} className={showUrl ? "hide" : ""}>
                            <Input className="force-align-center" style={{ width: 120 }} value={formData.name} placeholder="username" onChange={(e) => handleInput(e.target.value)} suffix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item style={{ marginLeft: defaultSpace }} className={showUrl ? "hide" : ""}>
                            <CountrySelect placeholder="Country" value={formData.country} onChange={(value) => setFormData(param => ({ ...param, country: value }))} />
                        </Form.Item>
                    </div>
                    <Form.Item style={{ marginLeft: defaultSpace }} >
                        <DatePicker placeholder="Date" className="force-align-center" style={{ width: 120 }} onChange={(value) => setFormData(param => ({ ...param, birthday: value }))} 
                        value={formData.birthday ? moment(formData.birthday, 'DD-MM-YYYY') : ""} format={'D/M/YYYY'} />
                    </Form.Item>
                    <div className="user-buttons-container">
                        <Form.Item style={{ marginLeft: defaultSpace }}>
                            <Button disabled={formData.country && formData.name && formData.birthday ? false : true} shape="round" htmlType="submit" style={formData.country && formData.name && formData.birthday ? addButtonActive : addButtonDisabled}
                               onClick={() => {
                                   let newData=formData
                                   newData.birthday=`${newData.birthday.days()}-${newData.birthday.months()}-${newData.birthday.years()}`
                                    addUser(newData)
                                    setFormData({})
                                }
                                }>
                                Add
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Row>
        </div>
    )
}
export default SingleuserAdd;