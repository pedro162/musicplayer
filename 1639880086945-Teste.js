
import { MigrationInterface, TableColumn } from 'typeorm'

module.exports = class Teste1639880086945 implements MigrationInterface {
  async up(queryRunner) {
    const hasWorkoutsTable = await queryRunner.hasTable('tabela_de_precos')
    if (hasWorkoutsTable) {
      await queryRunner.addColumn(
        'tabela_de_precos',
        new TableColumn({
          name: 'estado_id',
          type: 'int',
          // we make the new field nullable in order to enable the update
          // for existing data (schema sync will later update this column to be non
          // nullable)
          isNullable: true,
          default:null,
        }),
      )
      /*await queryRunner.query(
        `UPDATE workouts SET questionSetId = "MIGRATION-PLACEHOLDER" WHERE questionSetId IS NULL`,
      )*/
    }
  }

  async down(queryRunner) {
    const hasWorkoutsTable = await queryRunner.hasTable('tabela_de_precos')
    if (hasWorkoutsTable) {
      await queryRunner.dropColumn('tabela_de_precos', 'estado_id')
    }
  }
}
