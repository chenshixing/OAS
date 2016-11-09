/**
 * 企业用户注册表单
 * 
 * by koen
 * 2016/9/21
 */
// react 相关库
import React from 'react';

// antd 组件
import { Button, Form, Input,Checkbox,message } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const InputGroup = Input.Group;

import { Link } from 'react-router';

// 自定义验证 rule 及 fetch 方法
import { ruleType, fetch } from 'UTILS';

// 页面
class Reg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDis: true,
      btnSmsCodeText:'获取验证码',
      isBtnSmsCodeDisabled:false,
      protocolData:{}
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    var that=this;
    this.props.form.validateFields((errors, values) => {
      if(!errors){
        var data=values;
        data.userType=2;
        data.protocolId=this.state.protocolData.id;
        console.log('Submit!!!',data);
        fetch('/register/post.do',{
            body:data
          }).then((res)=>{
            console.log('res:',res);
            // that.props.history.push({
            //   pathname:'/userRegister/result'
            // });
            window.location.href='#/userRegister/result';
          })
      }else{
        console.log('请填完必填信息再提交...');
      }
      
    });
  }
  checkPassWord(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['conLoginPwd'], { force: true });
    }
    callback();
  }
  checkPassWordAgain(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('loginPwd')) {
      callback('两次所填写的密码不一致，请重新输入');
    } else {
      callback();
    }
  }
  getVerifyCode() {
    var that=this;
    //获取验证码
    const num = this.props.form.getFieldValue('mobile');
    if(!num){
      Modal.warning({
        title: '提示',
        content: '请先输入电话号码',
      });
      return;
    }
    // 获取验证码
    fetch('/common/smsAutoCode.do', {
      body: {
        "mobile": num,
        "businessType": "register"
      }
    }).then(res => {
      console.log('短信验证码获取成功：',res);
      message.success('短信验证码获取成功');
      countDown();
    });
    
    function countDown(){
        that.setState({
            isBtnSmsCodeDisabled:true
        });
        
        var count=60;
        let timer = setInterval(()=>{
            count--;
            if(count>0){
                that.setState({
                    btnSmsCodeText:`${count}秒后重新获取`
                });
            }else{
                clearInterval(timer);
                that.setState({
                    btnSmsCodeText:`获取验证码`,
                    isBtnSmsCodeDisabled:false
                });
            }
        },1000)
    }
  }
  agreementCheck(e) {
    this.setState({
      submitDis: !e.target.checked
    });
  }

  componentDidMount(){
    this.initPage();
  }

  initPage(){
      //获取此页面需要签署的协议
      fetch('/common/getCurrentProtocol.do',{
          body:{
              "protocolType": 1
          }
      }).then((res)=>{
          console.log('获取协议成功：',res.data);
          this.setState({
              protocolData:res.data,
          });
      },(res)=>{
          message.error(`${res.code}获取协议失败，请重新获取！`,3);
      })
  }

  render() {
    const { getFieldProps } = this.props.form;

    // 表单校验
    const rules = {
      realName: {
        rules: [
          {required: true, message: '真实姓名不能为空'},
          ruleType('cn')
        ]
      },
      companyName: {
        rules: [
          {required: true, message: '企业名不能为空'},
        ]
      },
      userNo: {
        rules: [
          {required: true, message: '登录名不能为空'},
          ruleType('en+num'),
          {min: 4, max: 32, message: '请输入4-20位字符'},
          
        ]
      },
      loginPwd: {
        rules: [
          {required: true, message: '密码不能为空'},
          {min: 8, max: 20, message: '请输入8-20位字符'},
          {validator: this.checkPassWord.bind(this)},
          ruleType('en-num')
        ]
      },
      conLoginPwd: {
        rules: [
          {required: true, message: '请再次输入密码'},
          {validator: this.checkPassWordAgain.bind(this)}
        ]
      },
      mobile: {
        rules: [
          {required: true, message: '手机号码不能为空'},
          ruleType('mobile')
        ]
      },
      smsCode: {
        rules: [
          {required: true, message: '短信验证码不能为空'},
          {min: 6, max: 6, message: '请输入6位的短信验证码'}
        ]
      }
    };

    // 表单布局
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    return (
      <Form horizontal>

        <FormItem
          {...formItemLayout}
          label="企业名称"
          required
        >
          <Input {...getFieldProps('companyName', rules.companyName)} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="登录名"
          required
        >
          <Input placeholder="4-32个英文字母、数字" {...getFieldProps('userNo', rules.userNo)} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="登录密码"  
          required
        >
          <Input type="password" autoComplete="off" placeholder="8-20位英文字母、数字或符号的组合，字母区分大小写" {...getFieldProps('loginPwd', rules.loginPwd)} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="确认密码"
          required
        >
          <Input type="password" autoComplete="off" {...getFieldProps('conLoginPwd', rules.conLoginPwd)} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="手机号码"
          required
        >
          <Input {...getFieldProps('mobile', rules.mobile)} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="短信验证码"
          required
        >
          <Input className="smsCodeInput" {...getFieldProps('smsCode', rules.smsCode)} />
          <Button className="ant-search-btn" disabled={this.state.isBtnSmsCodeDisabled} onClick={this.getVerifyCode.bind(this)}>{this.state.btnSmsCodeText}</Button>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="推荐人姓名"
        >
          <Input {...getFieldProps('recommenderNo')} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="推荐人编号"
        >
          <Input {...getFieldProps('recommender')} />
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Checkbox onChange={this.agreementCheck.bind(this)}>我已阅读并同意<a href="#">《{this.state.protocolData.protocolName}》</a></Checkbox>
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)} disabled={this.state.submitDis}>提交注册</Button>
        </FormItem>
        
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <p>已有账号？ <Link to="/userLogin" >直接登录</Link></p>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Reg);
