// 负责写视图的组件  页面
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { Icon, Tag, Button, Table, Dialog, Form, Input } from 'element-react'
class Home extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            htmlTitle: 'zimo',
            form: {
                name: '',
                age: ''
            },
            newForm: {},
            // addFrom:{},
            dialogVisible: false,
            columns: [
                {
                    type: 'index'
                },
                {
                    label: "年龄",
                    prop: "age",
                    width: 150,
                    render: function (data) {
                        return (
                            <span>
                                <span style={{ marginLeft: '10px' }}>{data.age}</span>
                            </span>)
                    }
                },
                {
                    label: "姓名",
                    prop: "name",
                    width: 160,
                    render: function (data) {
                        return <Tag>{data.name}</Tag>
                    }
                },
                {
                    label: "操作",
                    prop: "address",
                    render: (row, column, index) => {
                        // console.log(row, column, index)
                        return (
                            <span>
                                <Button plain={true} type="info"
                                    onClick={() => this.setState({ dialogVisible: true })} size="small">编辑</Button>
                                <Button type="danger" onClick={() => this.deleteData(index)} size="small">删除</Button>
                            </span>
                        )
                    }
                }
            ],
            data: [{
                age: '18',
                name: '王小虎',

            }, {
                age: '18',
                name: '王大虎',

            }, {
                age: '18',
                name: '王二虎',

            }, {
                age: '18',
                name: '王三虎',

            }, {
                age: '18',
                name: '王四虎',

            }, {
                age: '18',
                name: '王五虎',

            }, {
                age: '18',
                name: '王帅虎',

            }]
        }
    }
    // 将页面转换为PDF格式
    getPdf() {
        var title = this.state.htmlTitle
        html2Canvas(document.querySelector('.pdfDom'), {
            allowTaint: true
        }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
                document.querySelector('.btn').style.display='none';
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
                while (leftHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight
                    position -= 841.89
                    if (leftHeight > 0) {
                        PDF.addPage()
                    }
                }
            }
            PDF.save(title + '.pdf')
        }
        )
    }
    onSubmit(e) {
        console.log(e);
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.setState({
            newForm: this.state.form[key],
            // addFrom:this.state.form[key]
        })

        console.log(key, value,this.state.newForm)
    }
    // 删除按钮
    deleteData(item) {
        // console.log(item)
        let datas = this.state.data.filter((items, index) => index !== item);
        this.setState({
            data: datas
        })
    }
    closeDialog() {
        this.setState({
            form: this.state.newForm,
            dialogVisible: false
        })
        // 强制更新页面
        setTimeout(() => {
            this.forceUpdate();
        }, 1000)
    }
    addItem(){
        this.setState({
            dialogVisible: true,
            newForm:null,
        })
    }
    addData(datas){
        console.log(this.state.newForm)
        let s = this.state.data.push(datas);
        // this.setState({
        //     // form:this.state.newForm,
        //     data:s
        // })
    }
    render() {
        return (
            <div className="pdfDom">
            <Button type="danger" onClick={() => this.addItem()} size="small">添加</Button>
                <Table
                    style={{ width: '100%' }}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={250}
                    highlightCurrentRow={true}
                    onCurrentChange={item => {
                        console.log(item);
                        this.setState({ form: item,newForm:item });
                    }}
                />
                <Dialog
                    title="修改内容"
                    size="large"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <Form>
                            <Form.Item label="姓名">
                                <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                            </Form.Item>
                            <Form.Item label="年龄">
                                <Input value={this.state.form.age} onChange={this.onChange.bind(this, 'age')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="primary" onClick={() => this.closeDialog()}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
                <Dialog
                    title="添加内容"
                    size="large"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <Form>
                            <Form.Item label="姓名">
                                <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                            </Form.Item>
                            <Form.Item label="年龄">
                                <Input value={this.state.form.age} onChange={this.onChange.bind(this, 'age')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="primary" onClick={() => this.addData(this.state.from)}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
                <button type="button" className="btn btn-primary" onClick={()=>this.getPdf()}>导出PDF</button>
            </div>
        )
    }
}
export default Home;





