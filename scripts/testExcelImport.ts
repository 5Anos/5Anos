import fs from 'fs';
import crypto from 'crypto';
import * as XLSX from 'xlsx';

const wb = XLSX.utils.book_new();
const s1 = [
  ['Agrupamento de Escolas D. Afonso Henriques - Código 152345'],
  ['Ano Letivo 2024/2025 - Pauta de Alunos'],
  ['Turma: 5.º A - TIC'],
  [''],
  ['N.º', 'Processo', 'Nome do Aluno', 'Data Nasc.', 'Situação'],
  [1, 14001, 'Afonso Henriques Silva', '12/03/2014', 'Ativo'],
  [2, 14002, 'Beatriz Maria Santos Costa', '05/06/2014', 'Ativo'],
  [3, 14003, 'Carlos Eduardo Ferreira', '22/11/2013', 'Ativo'],
];
const s2 = [
  ['Pauta Turma 5º B'],
  ['Nº', 'Nome Completo', 'Turma'],
  [1, 'Diana Patrícia Rocha', '5º B'],
  [2, 'Eduardo Miguel Antunes', '5º B']
];
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s1), '5º A');
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s2), 'Turma 5B');
const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
const base64 = buf.toString('base64');

// Read SESSION_SECRET from environment or server
const SESSION_SECRET = process.env.SESSION_SECRET;

function createSessionToken(userId: string): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${userId}.${timestamp}.${nonce}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET!).update(payload).digest('hex');
  return Buffer.from(`${payload}.${signature}`).toString('base64url');
}

async function testParse() {
  if (!SESSION_SECRET) {
    console.log('No SESSION_SECRET in process.env');
    return;
  }
  const token = createSessionToken('admin_carla_oliveira_by');

  const res = await fetch('http://localhost:3000/api/teacher/students/parse-file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      fileName: 'Alunos_5ano.xlsx',
      fileBase64: base64,
      defaultTurma: '5.º A'
    })
  });
  console.log('Parse response status:', res.status);
  const data = await res.json();
  console.log('Total students parsed:', data.totalFound);
  console.log('Processed sheets:', data.filesProcessed);
  console.log('Sample parsed students:', data.students);
}
testParse();
