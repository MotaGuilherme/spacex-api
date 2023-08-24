import spaceSchema from '../schemas/launchers.schema.js';
import ValidationError from'../core/errors/ValidationError.js';

export default class LauncherRepository {

    async seedDatabase(transformedData) {
        try {
            return await spaceSchema.insertMany(transformedData)
        } catch (e) {
            throw new ValidationError("Error Message")
        }

    }

    async listData(filter) {
        try {

            const pipeline = [

                {
                    $facet: {
                        paginacao: [ { $count: 'totalDocs' },  // Renomeando a contagem para 'totalDocs'
                            { $addFields: { page: filter.numeroPagina } },  // Adicionando o número da página
                            { $addFields: { totalPages: { $ceil: { $divide: ['$totalDocs', filter.tamanhoPagina] } } } },  // Calculando o total de páginas
                            { $addFields: { hasNext: { $cond: [{ $lt: ['$page', '$totalPages'] }, true, false] } } },  // Verificando se existe próxima página
                            { $addFields: { hasPrev: false } }],
                        retorno: [
                            { $skip: ((filter.numeroPagina - 1) * filter.tamanhoPagina) },
                            { $limit: filter.tamanhoPagina }

                        ]
                    }
                }
            ]

            return  await spaceSchema.aggregate(pipeline)
        } catch (e) {
            throw new ValidationError("Error Message")
        }

    }
}