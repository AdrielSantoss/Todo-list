function Tasks(this: any, app) {
    this._db = app.db('tarefas');
}

Tasks.prototype.Insert = function (task: Body, res) {
    return this._db
        .insert(task)
        .then(() => res.status(200).send(task))
        .catch((err: string) => res.status(500).send('Erro inesperado:' + err));
};

Tasks.prototype.Select = function (res) {
    return this._db
        .select()
        .then((tasks) => res.status(200).send(tasks))
        .catch((err: string) => res.status(200).send('Erro inesperado: ' + err));
};

module.exports = function () {
    return Tasks;
};
