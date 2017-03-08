﻿function Element_ini() {//61034200、52115100、85011099、74101100、41041111  

    if (Ext.getCmp('panel_ele_2')) {
        Ext.getCmp('panel_ele_2').destroy();
    }

    var label_busiinfo = {
        columnWidth: 1,
        xtype: 'label',
        margin: '0 0 5 5',
        html: '<div style="border-bottom-width: 2px; border-bottom-color: gray; border-bottom-style: dashed;padding-left:20px;"><h5><b>申报要素</b></h5></div>'
    }

    var label_busiinfo_end = {
        columnWidth: 1,
        xtype: 'label',
        margin: '0 0 5 5',
        html: '<div style="border-bottom-width: 2px; border-bottom-color: gray; border-bottom-style: dashed;"></div>'
    }

    var customarea = Ext.getCmp('combo_CUSTOMAREA').getValue();
    var hscode = Ext.getCmp('HSCODE').getValue();

    var configItem = new Array();
    
    Ext.Ajax.request({
        url: "/RecordInfor/GetElements",
        params: { customarea: customarea, hscode: hscode, id: id },
        success: function (response, opts) {
            var json = Ext.decode(response.responseText);

            if (json.elements.length > 0) {
                configItem.push({ layout: 'column', height: 42, margin: '0 0 15 0', border: 0, items: [label_busiinfo] });

                var items_i;
                for (var i = 0; i < json.elements.length; i = i + 4) {

                    items_i = [];
                    items_i.push(Ext.create('Ext.form.Label', { id: 'label_ele_' + (i), name: 'label_ele_' + (i), text: json.elements[i].ELEMENTS, cls: "lab" }));
                    items_i.push(Ext.create('Ext.form.field.Text', { id: 'field_ele_' + (i), name: 'field_ele_' + (i) }));//, fieldLabel: json.elements[i].ELEMENTS

                    if ((i + 1) < json.elements.length) {
                        items_i.push(Ext.create('Ext.form.Label', { id: 'label_ele_' + (i + 1), name: 'label_ele_' + (i + 1), text: json.elements[i + 1].ELEMENTS, cls: "lab" }));
                        items_i.push(Ext.create('Ext.form.field.Text', { id: 'field_ele_' + (i + 1), name: 'field_ele_' + (i + 1) }));//, fieldLabel: json.elements[i + 1].ELEMENTS
                    }
                    if ((i + 2) < json.elements.length) {
                        items_i.push(Ext.create('Ext.form.Label', { id: 'label_ele_' + (i + 2), name: 'label_ele_' + (i + 2), text: json.elements[i + 2].ELEMENTS, cls: "lab" }));
                        items_i.push(Ext.create('Ext.form.field.Text', { id: 'field_ele_' + (i + 2), name: 'field_ele_' + (i + 2) }));//, fieldLabel: json.elements[i + 2].ELEMENTS
                    }
                    if ((i + 3) < json.elements.length) {
                        items_i.push(Ext.create('Ext.form.Label', { id: 'label_ele_' + (i + 3), name: 'label_ele_' + (i + 3), text: json.elements[i + 3].ELEMENTS, cls: "lab" }));
                        items_i.push(Ext.create('Ext.form.field.Text', { id: 'field_ele_' + (i + 3), name: 'field_ele_' + (i + 3) }));//, fieldLabel: json.elements[i + 3].ELEMENTS
                    }

                    configItem.push({ layout: 'column', margin: '0 0 0 50', border: 0, items: items_i });
                }

                configItem.push({ layout: 'column', height: 32, border: 0, items: [label_busiinfo_end] }, Ext.create('Ext.form.field.Hidden', { id: 'jsonEle', name: 'jsonEle' }));
                Ext.getCmp('jsonEle').setValue(response.responseText);//json.elements

                Ext.getCmp('panel_ele').add(Ext.create('Ext.panel.Panel', { id: 'panel_ele_2', columnWidth: 1, border: 0, items: configItem }));
            }
        }
    });
}

function form_ini_con() {
    var rownum = -1;//记录当前编辑的行号

    var label_baseinfo = {
        xtype: 'label',
        margin: '5',
        html: '<h4 style="margin-top:2px;margin-bottom:2px"><span class="label label-default"><i class="fa fa-chevron-circle-down"></i>&nbsp;成品单耗信息</span></h4>'
    }
    var tbar = Ext.create('Ext.toolbar.Toolbar', {
        items: [label_baseinfo, '->']
    })


    //对应料件序号
    var field_ITEMNO_CONSUME = Ext.create('Ext.form.field.Text', {
        id: 'ITEMNO_CONSUME',
        name: 'ITEMNO_CONSUME',
        flex: .85, margin: 0,
        allowBlank: false,
        blankText: '对应料件序号不能为空!'
    });

    var field_ITEMNO_LJ = {
        xtype: 'fieldcontainer',
        layout: 'hbox',
        fieldLabel: '对应料件序号',
        items: [field_ITEMNO_CONSUME,
            {
                id: 'ITEMNO_CONSUME_btn', xtype: 'button', handler: function () {
                    selectitemno(Ext.getCmp('combo_RECORDINFOID').getValue(), field_ITEMNO_CONSUME, field_ITEMNO_COMMODITYNAME, field_ITEMNO_SPECIFICATIONSMODEL, field_ITEMNO_UNITNAME, field_ITEMNO_UNIT);
                },
                text: '<span class="glyphicon glyphicon-search"></span>', flex: .15, margin: 0
            }
        ]
    }

    //对应料件名称
    var field_ITEMNO_COMMODITYNAME = Ext.create('Ext.form.field.Text', {
        id: 'ITEMNO_COMMODITYNAME',
        name: 'ITEMNO_COMMODITYNAME',
        fieldLabel: '对应名称', readOnly: true, fieldStyle: 'background-color: #CECECE; background-image: none;',
        allowBlank: false,
        blankText: '对应名称不能为空!'
    });

    //对应料件规格
    var field_ITEMNO_SPECIFICATIONSMODEL = Ext.create('Ext.form.field.Text', {
        id: 'ITEMNO_SPECIFICATIONSMODEL',
        name: 'ITEMNO_SPECIFICATIONSMODEL', readOnly: true, fieldStyle: 'background-color: #CECECE; background-image: none;',
        fieldLabel: '对应规格'
    });

    //对应料件计量单位
    var field_ITEMNO_UNITNAME = Ext.create('Ext.form.field.Text', {
        id: 'ITEMNO_UNITNAME',
        name: 'ITEMNO_UNITNAME',
        fieldLabel: '对应计量单位', readOnly: true, fieldStyle: 'background-color: #CECECE; background-image: none;',
        allowBlank: false,
        blankText: '对应计量单位不能为空!'
    });

    var field_ITEMNO_UNIT = Ext.create('Ext.form.field.Hidden', {
        name: 'ITEMNO_UNIT'
    })

    //单耗
    var field_CONSUME = Ext.create('Ext.form.field.Number', {
        id: 'CONSUME',
        name: 'CONSUME',
        fieldLabel: '单耗',
        allowBlank: false, hideTrigger: true,
        blankText: '单耗不能为空!'
    });

    //损耗率
    var field_ATTRITIONRATE = Ext.create('Ext.form.field.Text', {
        id: 'ATTRITIONRATE',
        name: 'ATTRITIONRATE',
        fieldLabel: '损耗率',
        allowBlank: false,
        blankText: '损耗率不能为空!'
    });

    var formpanel_con = Ext.create('Ext.form.Panel', {
        id: 'formpanel_con',
        renderTo: 'div_form_con',
        minHeight: 100,
        border: 0,
        tbar: tbar,
        fieldDefaults: {
            margin: '0 5 10 0',
            labelWidth: 80,
            columnWidth: .25,
            labelAlign: 'right',
            labelSeparator: '',
            msgTarget: 'under',
            validateOnBlur: false,
            validateOnChange: false
        },
        items: [
            { layout: 'column', height: 42, border: 0, margin: '5 0 0 0', items: [field_ITEMNO_LJ, field_ITEMNO_COMMODITYNAME, field_ITEMNO_SPECIFICATIONSMODEL, field_ITEMNO_UNITNAME] },
            { layout: 'column', height: 42, border: 0, items: [field_CONSUME, field_ATTRITIONRATE] },
            field_ITEMNO_UNIT
        ]
    });
    //=================================================
    var data_PRODUCTCONSUME = [];
    var store_PRODUCTCONSUME = Ext.create('Ext.data.JsonStore', {
        storeId: 'store_PRODUCTCONSUME',
        fields: ['ITEMNO_CONSUME', 'ITEMNO_COMMODITYNAME', 'ITEMNO_SPECIFICATIONSMODEL', 'ITEMNO_UNITNAME', 'ITEMNO_UNIT', 'CONSUME', 'ATTRITIONRATE'],
        data: data_PRODUCTCONSUME
    });
    var w_tbar = Ext.create('Ext.toolbar.Toolbar', {
        items: ['<span style="color:red">说明：双击列表项可对已添加的记录进行修改</span>',
                {
                    text: '<span style="color:blue">新增模式</span>', id: 'btn_mode', handler: function () {
                        if (Ext.getCmp('btn_mode').getText() == '<span style="color:blue">编辑模式</span>') {
                            Ext.getCmp('btn_mode').setText('<span style="color:blue">新增模式</span>');
                            rownum = -1;
                        }
                    }
                },
               '->',
               {
                   text: '<span class="icon iconfont" style="font-size:10px">&#xe622;</span>&nbsp;保 存',
                   handler: function () {

                       if (!formpanel_con.getForm().isValid()) {
                           return;
                       }

                       var formdata = formpanel_con.getForm().getValues();
                       if (rownum < 0) {//添加模式
                           store_PRODUCTCONSUME.insert(store_PRODUCTCONSUME.data.length, formdata);
                       }
                       else {//修改模式
                           var rec = store_PRODUCTCONSUME.getAt(rownum);
                           store_PRODUCTCONSUME.remove(rec);
                           store_PRODUCTCONSUME.insert(rownum, formdata);
                       }
                       formpanel_con.getForm().reset();
                       rownum = -1;
                       Ext.getCmp('btn_mode').setText('<span style="color:blue">新增模式</span>');
                   }
               },
               {
                   text: '<span class="icon iconfont" style="font-size:10px">&#xe6d3;</span>&nbsp;删 除',
                   handler: function () {
                       var recs = gridpanel_PRODUCTCONSUME.getSelectionModel().getSelection();
                       if (recs.length > 0) {
                           store_PRODUCTCONSUME.remove(recs);
                       }
                       Ext.getCmp('btn_mode').setText('<span style="color:blue">新增模式</span>');
                       rownum = -1;
                   }
               }]

    });
    var gridpanel_PRODUCTCONSUME = Ext.create('Ext.grid.Panel', {
        id: 'gridpanel_PRODUCTCONSUME',
        renderTo: 'div_form_con',
        store: store_PRODUCTCONSUME,
        height: 150,
        selModel: { selType: 'checkboxmodel' },
        enableColumnHide: false,
        tbar: w_tbar,
        columns: [
        { xtype: 'rownumberer', width: 35 },
        { header: 'ID', dataIndex: 'ID', hidden: true },
        { header: '对应料件序号', dataIndex: 'ITEMNO_CONSUME', width: 80 },
        { header: '对应料件名称', dataIndex: 'ITEMNO_COMMODITYNAME', width: 130 },
        { header: '对应料件规格', dataIndex: 'ITEMNO_SPECIFICATIONSMODEL', width: 130 },
        { header: '对应料件计量单位', dataIndex: 'ITEMNO_UNITNAME', width: 80 },
        { header: '单耗', dataIndex: 'CONSUME', width: 80 },
        { header: '损耗率', dataIndex: 'ATTRITIONRATE', width: 80 }
        ],
        listeners: {
            itemdblclick: function (w_grid, record, item, index, e, eOpts) {
                rownum = index;
                formpanel_con.getForm().setValues(record.data);
                Ext.getCmp('btn_mode').setText('<span style="color:blue">编辑模式</span>');
            }
        },
        viewConfig: {
            enableTextSelection: true
        },
        forceFit: true
    });

}