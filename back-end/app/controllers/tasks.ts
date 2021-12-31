module.exports.CreateTask = (application, req, res) => {
    const data = req.body as Body;

    req.assert('Titulo', 'O Titulo é obrigatório').notEmpty();
    req.assert('Descricao', 'A Descrição é obrigatória').notEmpty();
    req.assert('Titulo', 'O Titulo deve conter no minímo 6 caracteres.').isLength({ min: 6 });

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).json({ errors });
    }

    try {
        const repository = new (application as any).app.repositories.Tasks(application);
        repository.Insert(data, res);
    } catch (error) {
        console.error(error);
    }
};

module.exports.GetTasks = (application, req, res) => {
    try {
        const repository = new (application as any).app.repositories.Tasks(application);
        repository.Select(res);
    } catch (error) {
        console.error(error);
    }
};
