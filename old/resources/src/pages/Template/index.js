import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from '../../helpers/Alert';

import './style.scss';

import alignLeft from '../../assets/icons/align-left-solid.svg';
import alignCenter from '../../assets/icons/align-center-solid.svg';
import alignRight from '../../assets/icons/align-right-solid.svg';

export default function Templates({ history }) {
    const [templateId, setTemplateId] = useState(0);
    const [templateType, setTemplateType] = useState('');
    const [templateImage, setTemplateImage] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [showPreviewImage, setShowPreviewImage ] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [dimensionTemplate, setDimensionTemplate] = useState({});

    const [selectField, setSelectField] = useState('');
    const [listFields, setListFields] = useState({});
    const [fields, setFields] = useState({});
    const [googleFonts, setGoogleFonts] = useState([]);
    
    const [companyFieldStyle, setCompanyFieldStyle] = useState({});
    const [logoFieldStyle, setLogoFieldStyle] = useState({});
    const [phoneFieldStyle, setPhoneFieldStyle] = useState({});

    const [previewText, setPreviewText] = useState('');
    const [companyText, setCompanyText] = useState('');
    const [logoText, setLogoText] = useState('');
    const [phoneText, setPhoneText] = useState('');

    useEffect(() => {
        // Listen change in temlateType for apply dimensions on template
        if(templateType === 'capa') setDimensionTemplate({width: '828px', height: '475px'});
        if(templateType === 'post') setDimensionTemplate({width: '800px', height: '800px'});
    },[templateType]);

    useEffect(() => {
        // Listen change in fields for apply Style in the corresponding Element
        if(selectField == 'company') setCompanyFieldStyle(mountObjectStyle(fields));
        if(selectField == 'logo') setLogoFieldStyle(mountObjectStyle(fields));
        if(selectField == 'phone') setPhoneFieldStyle(mountObjectStyle(fields));
    }, [fields]);

    useEffect(() => {
        // Listen to the change in previewText to record in the corresponding text field
        if(selectField == 'company') setCompanyText(previewText);
        if(selectField == 'logo') setLogoText(previewText);
        if(selectField == 'phone') setPhoneText(previewText);
    }, [previewText]);

    useEffect(() => {

        // check if has a localStorage template for edit the template
        let arrTemplate = JSON.parse(localStorage.getItem('template'));
        localStorage.removeItem('template');
        
        if(arrTemplate) {
            let template = arrTemplate[0];
            setTemplateType(template.type);
            setShowPreviewImage(true);
            setTemplateName(template.name);
            setPreviewImage(`/uploads/${template.image}`);
            setTemplateImage(`${template.image}`);
            setListFields(JSON.parse(template.fields));
            setTemplateId(template.id);
        }
    }, []);

    function handleTemplateImage(e) {
        let imageInput = e.target.files[0];
        let reader = new FileReader();

        // Show Image upload in memory
        reader.onload = (event) =>  {
            setPreviewImage(event.target.result);
        }
        reader.readAsDataURL(imageInput);

        setTemplateImage(imageInput);
        setShowPreviewImage(true);
        
        e.target.value = null;
    }

    function handleSelectField(value) {
        setFields({});
        if(value in listFields) setFields(listFields[value]);
        setSelectField(value);

        if(value == 'company') setPreviewText(companyText); 
        if(value == 'logo') setPreviewText(logoText);
        if(value == 'phone') setPreviewText(phoneText);
    }

    function handleSetAlignText(e, align) {
        e.preventDefault();
        setFields({...fields, text_align: align});
    }

    function mountObjectStyle(field) {
        return {
            left: field.left+'px',
            top: field.top+'px',
            width: field.width+'px',
            height: field.height+'px',
            fontSize: field.font_size+'px',
            transform: `rotate(${field.rotate}deg)`,
            fontFamily: field.font_family,
            color: '#'+field.color,
            textAlign: field.text_align
        }
    }

    function mountGoogleFontsImports() {
        setGoogleFonts(listFields.google_fonts.split(','));
    }

    function handleSaveFields() {
        if(selectField == 'phone') {
            setListFields({...listFields, phone: fields}); 
            setPhoneText(previewText);
        }
        if(selectField == 'company') {
            setListFields({...listFields, company: fields});
            setCompanyText(previewText);
        }
        if(selectField == 'logo'){
            setListFields({...listFields, logo: fields});
            setLogoText(previewText);
        } 

        setSelectField('');
        setFields({
            left: '',
            top: '',
            width: '',
            height: '',
            rotate: '',
            font_size: '',
            font_family: '',
            color: '',
            text_align: ''
        });
        setPreviewText('');
    }

    function clearStates() {
        setTemplateType('');
        setPreviewImage('');
        setTemplateImage([]);
        setDimensionTemplate({});

        setShowPreviewImage(false);
        setTemplateName('');
        setListFields({});
        setFields({});
        
        setPreviewText('');
        setCompanyText('');
        setLogoText('');
        setPhoneText('');

        setLogoFieldStyle({});
        setPhoneFieldStyle({});
        setCompanyFieldStyle({});
    }

    function handleSubmitTemplate() {
        let form = new FormData();
        form.append("image", templateImage);
        form.append("name", templateName);
        form.append("type", templateType);
        form.append("fields", JSON.stringify(listFields));

        if(templateId == 0) {
            api.post('/templates', form, {
                headers: {
                  'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
              }).then(() => {
                Alert(toast, 'Template salvo com sucesso!');
                clearStates();
            });
        }
        
        if(templateId > 0) {
            form.append('_method', 'PUT');
            api.post(`/templates/${templateId}`, form, {
                headers: {
                  'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
              }).then((response) => {
                Alert(toast, 'Template atualizado com sucesso!');
                clearStates();
                history.push('/templatelist');
            });
        }
    }

    return (
        <>
            {googleFonts.length > 0 && googleFonts.map((font, index) => (
                <link key={index} href={`https://fonts.googleapis.com/css2?family=${font.trim()}&display=swap`} rel="stylesheet"></link>
            ))}
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-8">
                        <div className="mb-3">
                            <h1>Criação do Template</h1>
                        </div>

                        <div className="input-group mb-3">
                            <select className="custom-select" onChange={ (e) => setTemplateType(e.target.value) } value={templateType}>
                                <option>Selecione o tipo de template</option>
                                <option value="capa">Capa</option>
                                <option value="post">Post</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input className="custom-file-input" type="file" onChange={(e)=> handleTemplateImage(e)}/>
                                <label className="custom-file-label">Escolher arquivo</label>
                            </div>
                        </div>

                        {showPreviewImage && (
                        <>
                            <div className="d-flex mb-3">
                                <div className="input-group mr-2">
                                    <input type="text" className="form-control" onChange={(e) => setTemplateName(e.target.value)}
                                        placeholder="Nome do template" value={templateName}/>
                                </div>
                                <div className="input-group align-items-center">
                                    <button onClick={() => handleSubmitTemplate()} className="btn btn-primary" type="button" disabled={templateName.length == 0}>Salvar Template</button>
                                    {templateId > 0 && (
                                        <span className="flag-editing">Editando</span>    
                                    )}
                                </div>
                            </div>

                            <div className="position-relative">
                                <img src={previewImage} style={dimensionTemplate} alt="Imagem de fundo do template" />
                                
                                <div className="preview-custom-field" style={companyFieldStyle}>{companyText}</div>
                                <div className="preview-custom-field field-image" style={logoFieldStyle}>{logoText}</div>
                                <div className="preview-custom-field" style={phoneFieldStyle}>{phoneText}</div>
                            </div>
                        </>
                        )}
                    </div>
                    
                    {showPreviewImage && (
                        <div className="mb-2 col-4 position-fixed" style={{right: 0}}>
                            <h3>Configuração Template</h3>
                            
                            <select className="custom-select mb-3" onChange={(e) => handleSelectField(e.target.value)} value={selectField}>
                                <option value="">Selecione um campo</option>
                                <option value="company">Nome da empresa</option>
                                <option value="logo">Logo</option>
                                <option value="phone">Telefone</option>
                            </select>

                            <div className="row">
                                {selectField != 'logo' && (
                                <div className="col-12 mb-3">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Preview Texto</span>
                                        </div>
                                        <input type="text" className="form-control" onChange={(e) => setPreviewText(e.target.value)} value={previewText}/>
                                    </div>
                                </div>
                                )}

                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">POS X</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, left: e.target.value})} value={fields.left || ''}/>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">POS Y</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, top: e.target.value})} value={fields.top || ''} />
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

                                {selectField != 'logo' && (
                                    <div className="col-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Tamanho Fonte</span>
                                            </div>
                                            <input type="number" className="form-control" onChange={(e) => setFields({...fields, font_size: e.target.value})} value={fields.font_size || ''} />
                                        </div>
                                    </div>
                                )}
                                
                                {selectField != 'logo' && (

                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Rotacionar</span>
                                        </div>
                                        <input type="number" className="form-control" onChange={(e) => setFields({...fields, rotate: e.target.value})} value={fields.rotate || ''}/>
                                    </div>
                                </div>
                                )}

                                {selectField != 'logo' && (
                                    <div className="col-12">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Font Family</span>
                                            </div>
                                            <input type="text" className="form-control" onChange={(e) => setFields({...fields, font_family: e.target.value})} value={fields.font_family || ''} />
                                        </div>
                                    </div>
                                )}
                                
                                {selectField != 'logo' && (
                                    <div className="col-12 d-flex">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Cor</span>
                                            </div>
                                            <input type="text" className="form-control" onChange={(e) => setFields({...fields, color: e.target.value})} value={fields.color || ''}/>
                                        </div>

                                        <div className="input-group align-items-center">
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
                                    </div>
                                )}
                            </div>

                            <hr/>

                            {selectField != 'logo' && (
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Fonts Google</span>
                                            </div>
                                            <input type="text" className="form-control" onChange={(e) => setListFields({...listFields, google_fonts: e.target.value})} value={listFields.google_fonts || ''}/>
                                            <button className="btn btn-primary btn-sm ml-1" onClick={() => mountGoogleFontsImports()} disabled={!listFields.google_fonts}>Aplicar fonts</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="input-group">
                                <button className="btn btn-success" type="button" onClick={() => handleSaveFields()} disabled={selectField == ''}>Salvar Campo</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}