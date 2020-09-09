import React, { useState, useEffect } from 'react';

import alignLeft from '../../assets/icons/align-left-solid.svg';
import alignCenter from '../../assets/icons/align-center-solid.svg';
import alignRight from '../../assets/icons/align-right-solid.svg';

export default function Templates() {
    const [templateType, setTemplateType] = useState(0);
    const [showPreviewImage, setShowPreviewImage ] = useState(false);
    const [imageTemplate, setImageTemplate] = useState('');
    const [styleTypeTemplate, setStyleTypeTemplate] = useState({});
    const [templateName, setTemplateName] = useState('');

    const [listFields, setListFields] = useState({});
    const [fields, setFields] = useState({});
    const [nomeFields, setNomeFields] = useState({});
    const [logoFields, setLogoFields] = useState({});
    const [whatsappFields, setWhatsappFields] = useState({});
    const [previewText, setPreviewText] = useState('');
    const [selectField, setSelectField] = useState('');

    useEffect(() => {
        if(templateType === 1) setStyleTypeTemplate({width: '828px', height: '475px'});
        if(templateType === 2) setStyleTypeTemplate({width: '800px', height: '800px'});
    },[templateType]);

    useEffect(() => {
        console.log(listFields);
    }, [listFields]);

    function handleChangeImage(e) {
        let imageInput = e.target.files[0];
        let reader = new FileReader();

        // Show Image upload in memory
        reader.onload = (event) =>  {
            setImageTemplate(event.target.result);
        }
        reader.readAsDataURL(imageInput);

        setShowPreviewImage(true);
    }

    function handleSelectField(value) {
        if(value == 'whatsapp') setFields(whatsappFields);
        if(value == 'nome') setFields(nomeFields);
        if(value == 'logo') setFields(logoFields);
        if(value in listFields) setFields(listFields[value]);
        setSelectField(value);
    }

    function handleSetAlignText(e, align) {
        e.preventDefault();
        setFields({...fields, text_align: align});
    }

    function handleSaveFields() {
        // Ficou pendente salvar os campos whatsapp/logo/nome em suas respectias posições do array
        if(selectField == 'whatsapp') setListFields({...listFields, whatsapp: fields});
        if(selectField == 'nome') setListFields({...listFields, nome: fields});
        if(selectField == 'logo') setListFields({...listFields, logo: fields});

        setSelectField('');
        setFields({
            pos_x: '',
            pos_y: '',
            width: '',
            height: '',
            rotate: '',
            font_size: '',
            font_family: '',
            font_url: '',
            color: '',
            color_block: '',
        });
        setPreviewText('');
    }

    function handleSaveTemplate() {
        setListFields({...listFields, template_name: templateName});
        // Fazer requisição no servidor para salvar os dados.
        // Enviar Fields, Logo, TemplateType
        // Redirecionar para a tela de listagem de templates.
    }

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-8">
                        <div className="mb-3">
                            <h1>Criação do Banner</h1>
                        </div>

                        <div className="input-group mb-3">
                            <select className="custom-select" onChange={ (e)=> setTemplateType(parseInt(e.target.value)) }>
                                <option value="0">Selecione o tipo do banner</option>
                                <option value="1">Capa</option>
                                <option value="2">Post</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input className="custom-file-input" type="file" onChange={(e)=> handleChangeImage(e)}
                                />
                                <label className="custom-file-label">Escolher arquivo</label>
                            </div>
                        </div>

                        {showPreviewImage && (
                        <>
                            <div className="d-flex mb-3">
                                <div className="input-group mr-2">
                                    <input type="text" className="form-control" onChange={(e) => setTemplateName(e.target.value)}
                                        placeholder="Nome do template" />
                                </div>
                                <div className="input-group">
                                    <button onClick={() => handleSaveTemplate()} className="btn btn-primary" type="button">Salvar Template</button>
                                </div>
                            </div>

                            <div className="">
                                <img src={imageTemplate} style={styleTypeTemplate} alt="Imagem de fundo do template" />
                            </div>
                        </>
                        )}
                    </div>
                    
                    {showPreviewImage && (
                        <div v-show="displayFieldsImage" className="mb-2 col-4 position-fixed" style={{right: 0}}>
                            <h3>Configuração Template</h3>
                            
                            <select className="custom-select mb-2" onChange={(e) => handleSelectField(e.target.value)} value={selectField}>
                                <option value="">Selecione um campo</option>
                                <option value="nome">Nome</option>
                                <option value="logo">Logo</option>
                                <option value="whatsapp">Whatsapp</option>
                            </select>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">POS X</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, pos_x: e.target.value})} value={fields.pos_x || ''}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">POS Y</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, pos_y: e.target.value})} value={fields.pos_y || ''} />
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Largura</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, width: e.target.value})} value={fields.width || ''} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Altura</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, height: e.target.value})} value={fields.height || ''} />
                                    </div>
                                </div>

                                <div className="col-6" v-show="isImage == false">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Tamanho Fonte</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, font_size: e.target.value})} value={fields.font_size || ''} />
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Rotacionar</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, rotate: e.target.value})} value={fields.rotate || ''}/>
                                    </div>
                                </div>

                                <div className="col-12" v-show="isImage == false">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Font Family</span>
                                        </div>
                                        <input type="text" className="form-control" onChange={(e) => setFields({...fields, font_family: e.target.value})} value={fields.font_family || ''} />
                                    </div>
                                </div>

                                <div className="col-12" v-show="isImage == false">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">URL fonte Google</span>
                                        </div>
                                        <input type="text" className="form-control" onChange={(e) => setFields({...fields, font_url: e.target.value})} value={fields.font_url || ''}/>
                                    </div>
                                </div>

                                <div className="col-5" v-show="isImage == false">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Cor</span>
                                        </div>
                                        <input type="text" className="form-control" onChange={(e) => setFields({...fields, color: e.target.value})} value={fields.color || ''}/>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Cor Bloco</span>
                                        </div>
                                        <input type="text" className="form-control" onChange={(e) => setFields({...fields, color_block: e.target.value})} value={fields.color_block || ''}/>
                                    </div>
                                </div>

                                <div className="col-12" v-show="isImage == false">
                                    <div className="input-group align-items-center mb-1">
                                        <div className="ml-auto">
                                            <a href="" onClick={(e) => handleSetAlignText(e, 'left')}>
                                                <img src={alignLeft} alt="icon align-left" width="20"
                                                    height="20" />
                                            </a>
                                            <a href="" onClick={(e) => handleSetAlignText(e, 'center')}>
                                                <img src={alignCenter} alt="icon align-center"
                                                    width="20" height="20" />
                                            </a>
                                            <a href="" onClick={(e) => handleSetAlignText(e, 'right')}>
                                                <img src={alignRight} alt="icon align-right"
                                                    width="20" height="20" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Preview Texto</span>
                                        </div>
                                        <input type="text" className="form-control" onChange={(e) => setPreviewText(e.target.value)} value={previewText}/>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <button className="btn btn-success" type="button" onClick={() => handleSaveFields()}>Salvar Campo</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}