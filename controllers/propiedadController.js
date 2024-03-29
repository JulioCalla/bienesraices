const admin = (req, res) => {
    res.render('propiedades/admin',{
        pagina: 'mis propiedades'
    })
}

const cotiza = (req, res) => {
    res.render('cotizacion/cotizacion',{
        pagina: 'REALIZA TU COTIZACION',
        csrfToken: req.csrfToken(),
    })
}

const cotizar = (req, res) => {
    res.render("cotizacion/cotizacion", {
        pagina: 'REALIZA TU COTIZACION',
        csrfToken: req.csrfToken()
    });
};
export{
    admin,
    cotiza,
    cotizar
}