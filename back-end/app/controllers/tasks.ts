module.exports.CreateTask = (application, req, res) => {
    const data = req.body;

    try {
        const repository = new (application as any).app.repositories.Tasks(application);
        repository.Insert(data, res);
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports.EditTask = (application, req, res) => {
    const data = req.body;

    try {
        const repository = new (application as any).app.repositories.Tasks(application);
        repository.Update(data, res);
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports.GetTasks = (application, req, res) => {
    try {
        const repository = new (application as any).app.repositories.Tasks(application);
        repository.Select(res);
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports.RemoveTask = (application, req, res) => {
    try {
        const repository = new (application as any).app.repositories.Tasks(application);
        repository.Delete(req.params.id, res);
    } catch (error) {
        return res.status(500).send(error);
    }
};
