import React, { useState, useEffect } from 'react';

export default function Templates() {
    const [templateType, setTemplateType] = useState(0);
    const [showPreviewImage, setShowPreviewImage ] = useState(false);
    const [imageTemplate, setImageTemplate] = useState('');
    const [styleTypeTemplate, setStyleTypeTemplate] = useState({});

    useEffect(() => {
        if(templateType === 1) setStyleTypeTemplate({width: '828px', height: '475px'});
        if(templateType === 2) setStyleTypeTemplate({width: '800px', height: '800px'});

        console.log(templateType);
        console.log(styleTypeTemplate);
    },[templateType]);

    function handleChangeImage(e) {
        let imageInput = e.target.files[0];
        let reader = new FileReader();

        reader.onload = (event) =>  {
            setImageTemplate(event.target.result);
        }
        reader.readAsDataURL(imageInput);

        setShowPreviewImage(true);
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
                            <select className="custom-select" onChange={ (e)=> setTemplateType(parseInt(e.target.value))
                                }>
                                <option value="0">Selecione o tipo do banner</option>
                                <option value="1">Capa</option>
                                <option value="2">Post</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input className="custom-file-input" type="file" onChange={(e)=> handleChangeImage(e)}/>
                                <label className="custom-file-label">Escolher arquivo</label>
                            </div>
                        </div>

                        {showPreviewImage && (
                        <>
                            <div>
                                <div className="input-group">
                                    <input type="text" className="form-control" v-model="nameTemplate"
                                        placeholder="Nome do template" />
                                </div>
                                <div className="input-group">
                                    <button onClick={null} className="btn btn-primary" type="button">Salvar
                                        Template</button>
                                </div>
                            </div>

                            <div className="">
                                <img src={imageTemplate} style={styleTypeTemplate} alt="Imagem de fundo do template" />
                            </div>
                        </>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}