import { db } from '../src/firebase';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import crypto from 'crypto';
import { promisify } from 'util';
import fs from 'fs';
import {
  generateKidUsername,
  generateKidPassword,
  parseStudentName,
  normalizeTurmaName,
} from '../src/utils/studentCredentials';
import { generateUniqueKidNickname } from '../src/utils/nicknameValidator';
import { getDefaultAvatar } from '../src/utils/avatarUtils';

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return {
    salt,
    hash: derivedKey.toString('hex'),
  };
}

const pdfPautas: Record<string, { number: number; name: string }[]> = {
  '5.º A': [
    { number: 1, name: 'Anderson Obega' },
    { number: 2, name: 'Artur Pawelczyk Pimentel' },
    { number: 3, name: 'Carolina Martins Bexiga Nunes Pinheiro' },
    { number: 4, name: 'Clara Jorge Morgadinho de Morais Borga' },
    { number: 5, name: 'Cláudia dos Santos Felismino' },
    { number: 6, name: 'Denys Zlochevskyi' },
    { number: 7, name: 'Diana Alexandra de Carvalho Santos' },
    { number: 8, name: 'Dinis Nascimento Machado' },
    { number: 9, name: 'Diogo Mendonça Baptista' },
    { number: 10, name: 'Duarte Santos Gamboa Antunes' },
    { number: 11, name: 'Helena Santos Ferreira Rosa Pinto' },
    { number: 12, name: 'Joana Freire Batista' },
    { number: 13, name: 'João Miguel Antunes Raimundo' },
    { number: 14, name: 'José Júlio da Costa Pinto' },
    { number: 15, name: 'Leonor Ferreira de Lima Santos' },
    { number: 16, name: 'Liane Sofia Filomino Barros' },
    { number: 17, name: 'Luana Alves Costa Paisano Pinho' },
    { number: 18, name: 'Luísa Lemos Guerreiro' },
    { number: 19, name: 'Madalena Gonçalves da Costa' },
    { number: 20, name: 'Maria Carolina Craveiro Lopes Correia Esperanço' },
    { number: 21, name: 'Maria Inês Areias Moreira' },
    { number: 22, name: 'Mel Chakour' },
    { number: 23, name: 'Nelmira Obega' },
    { number: 24, name: 'Rodrigo Alexandre da Silva Teles' },
    { number: 25, name: 'Salvador Esteves Pereira' },
    { number: 26, name: 'Vasco Monteiro Bettencourt' },
    { number: 27, name: 'Vasco Pinto Rocha' },
    { number: 28, name: 'Vicente Lugano Araujo de Sousa' },
  ],
  '5.º B': [
    { number: 1, name: 'Catarina Isabel Varela Semedo Ferreira' },
    { number: 2, name: 'Débora Isabel Rocha Monteiro Andrade' },
    { number: 3, name: 'Duarte Bettencourt Bernardo' },
    { number: 4, name: 'Duarte Miguel Pereira Lourenço' },
    { number: 5, name: 'Enzo Ricardo Neto dos Santos' },
    { number: 6, name: 'Isabela Viana Galvão' },
    { number: 7, name: 'Ivan Sousa Garcia' },
    { number: 8, name: 'João Pedro Monteiro de Oliveira Reis' },
    { number: 9, name: 'Laura Ribeiro Godinho Rodrigues' },
    { number: 10, name: 'Lourenço de Almeida Silva' },
    { number: 11, name: 'Mafalda Pinto Correia' },
    { number: 12, name: 'Maria Clara Silva Nunes' },
    { number: 13, name: 'Mariana Domingues Ferreira Cruz' },
    { number: 14, name: 'Nair Santos Silva Conceição' },
    { number: 15, name: 'Nicole Lamine Jesus' },
    { number: 16, name: 'Noa Sofia Monteiro Gouveia' },
    { number: 17, name: 'Pakiza Sheraz' },
    { number: 18, name: 'Pedro Mateus Hernandez Tavares dos Santos' },
    { number: 19, name: 'Rafael Guilherme Santos Pereira Fernandes' },
    { number: 20, name: 'Santiago Manuel Moras Baldo' },
    { number: 21, name: 'Waldemiro Claudio Carlos Sambingo Lobo' },
    { number: 22, name: 'Yutong He' },
    { number: 23, name: 'Carminho de Almeida Laffan Oliveira' },
  ],
  '5.º C': [
    { number: 1, name: 'Alice de Oliveira Florentino' },
    { number: 2, name: 'Álvaro Pires Beja' },
    { number: 3, name: 'António Martins Pedras Cadima Lopes' },
    { number: 4, name: 'Dinis Cardoso Mendes' },
    { number: 5, name: 'Dinis Taborda Rodrigues' },
    { number: 6, name: 'Gonçalo Ribeiro Oliveira' },
    { number: 7, name: 'Íris Pedrosa da Silva' },
    { number: 8, name: 'Isaac Miguel Fernandes Ribeiro' },
    { number: 9, name: 'Isaac Rodrigues Rua' },
    { number: 10, name: 'Isadora Campagnaro Porto' },
    { number: 11, name: 'Lara Martins Gonçalves' },
    { number: 12, name: 'Laura Silva Martins' },
    { number: 13, name: 'Leonor das Neves Cardoso Ferreira' },
    { number: 14, name: 'Lourenço Martins Ezequiel' },
    { number: 15, name: 'Luís Roberto Talaia Jacinto' },
    { number: 16, name: 'Madalena Amaral Bento' },
    { number: 17, name: 'Maiara Filipa Brandão Lourenço' },
    { number: 18, name: 'Marcela Francisco Battaglion' },
    { number: 19, name: 'Margarida Baptista de Almeida' },
    { number: 20, name: 'Margarida Santos Pires' },
    { number: 21, name: 'Maria Clara Harrington dos Santos' },
    { number: 22, name: 'Maria Izabela Icur' },
    { number: 23, name: 'Maria Sofia Felício Pereira Capela' },
    { number: 24, name: 'Mariana Fortuna Meneses' },
    { number: 25, name: 'Miguel Ângelo Anes Fonseca' },
    { number: 26, name: 'Sara Ribeiro Oliveira' },
    { number: 27, name: 'Sol de Fátima Silvestre Francisco' },
    { number: 28, name: 'Teresa Carmelino Alves dos Santos Jorge' },
    { number: 29, name: 'Yasmin Beatriz Paulitos da Silva' },
    { number: 30, name: 'Catarina Isabel Varela Semedo Ferreira' },
    { number: 31, name: 'ALUNA CARLA EXPERIEINCIA' },
  ],
  '5.º D': [
    { number: 1, name: 'Alícia Ferreira Códices' },
    { number: 2, name: 'Bárbara Rodrigues Lopes' },
    { number: 3, name: 'Camila Batista Coutinho' },
    { number: 4, name: 'Chenxi Zheng' },
    { number: 5, name: 'Danielly Marques Fonseca Filipe' },
    { number: 6, name: 'Gabriel Baleine Bettencourt Bernardo' },
    { number: 7, name: 'Guilherme António Borges Moreira' },
    { number: 8, name: 'Guilherme da Costa Novais' },
    { number: 9, name: 'Hareem Rehmat' },
    { number: 10, name: 'João Miguel Vigário Rodrigues' },
    { number: 11, name: 'Kissamá Francisco de Castro Seabra' },
    { number: 12, name: 'Laura Sioga dos Santos' },
    { number: 13, name: 'Luana Raquel Lopes da Silva' },
    { number: 14, name: 'Lucas Benjamin Farias Meneses' },
    { number: 15, name: 'Margarida Sofia Rosa Rodrigues' },
    { number: 16, name: 'Matilde Alexandra Garrido Neves' },
    { number: 17, name: 'Muhammad Muzamal Hussain' },
    { number: 18, name: 'Pedro Gaspar Pires Cobra' },
    { number: 19, name: 'Senia Timilsina' },
    { number: 20, name: 'Vasco Rafael Luis Gonçalves' },
    { number: 21, name: 'Vicente Henrique Luís Gonçalves' },
    { number: 22, name: 'Vinicius Inácio dos Santos' },
  ],
  '5.º E': [
    { number: 1, name: 'Adrien Francisco Amado Martins' },
    { number: 2, name: 'Alícia Victória Lopes de Almeida' },
    { number: 3, name: 'Ana Rita Pisoeiro Pereira' },
    { number: 4, name: 'Barbara Sousa Santos' },
    { number: 5, name: 'Derick da Silva Barros Vaz' },
    { number: 6, name: 'Diogo Marques Vital' },
    { number: 7, name: 'Enmanuel Berrio Fraser' },
    { number: 8, name: 'Francisco Correia dos Santos Cardoso Oliveira' },
    { number: 9, name: 'Guilherme Muranho Monteiro' },
    { number: 10, name: 'Inês Ribeiro Gouveia' },
    { number: 11, name: 'Iris Mendes Soares' },
    { number: 12, name: 'Joana Alexandra Oliveira Teixeira' },
    { number: 13, name: 'Lara Valles Rocha Martins' },
    { number: 14, name: 'Mafalda dos Santos Chaparro' },
    { number: 15, name: 'Mafalda Mouro Cruz' },
    { number: 16, name: 'Maria Carmelino Alves dos Santos Jorge' },
    { number: 17, name: 'Maria Inês Sousa de Almeida' },
    { number: 18, name: 'Matheus Antunes Carvalho' },
    { number: 19, name: 'Nicolas Ferreira Ribeiro' },
    { number: 20, name: 'Noa Yasmin Silva Rodrigues' },
    { number: 21, name: 'Salvador dos Santos Pinto' },
    { number: 22, name: 'Sandro Silva Carvalho Gonçalves Tavares' },
    { number: 23, name: 'Santiago Alexandre Monteiro Oliveira' },
    { number: 24, name: 'Santiago Miguel de Almeida Fernandes' },
    { number: 25, name: 'Santiago Miguel Nunes' },
    { number: 26, name: 'Sirem Turé' },
    { number: 27, name: 'Yasmin dos Santos Fernandes' },
    { number: 28, name: 'Yuri Rafael Gomes Batista' },
  ],
  '5.º F': [
    { number: 1, name: 'Afonso Miguel de Albuquerque e Fernandes Alves' },
    { number: 2, name: 'Carolina de Oliveira Lisboa' },
    { number: 3, name: 'Clara da Gandra Tonel' },
    { number: 4, name: 'Daniel da Conceição Pacheco Lima' },
    { number: 5, name: 'Flávia Gonçalves Fernandes' },
    { number: 6, name: 'Francisca Silva Alfredo' },
    { number: 7, name: 'Guilherme Pinto da Fonseca' },
    { number: 8, name: 'Gustavo Martins Pires Correia Lameira' },
    { number: 9, name: 'Gustavo Valoroso Pereira' },
    { number: 10, name: 'Isaac Samuel da Silva Paulo' },
    { number: 11, name: 'Letícia Alexandra Cardoso da Rocha' },
    { number: 12, name: 'Luca Tomé Bráz' },
    { number: 13, name: 'Mara Sofia Cohen' },
    { number: 14, name: 'Maria Leonor Caetano Serafim' },
    { number: 15, name: 'Maria Neves Romão' },
    { number: 16, name: 'Mariana João Ribeiro Fontes Frade' },
    { number: 17, name: 'Martim Batista Coelho de Sousa Folgado' },
    { number: 18, name: 'Martim Francisco Raeiro' },
    { number: 19, name: 'Miguel da Silva Martins da Conceição Melgueira' },
    { number: 20, name: 'Miguel Mendes Carona' },
    { number: 21, name: 'Miriam Isabel Ferreira Antunes Lopes Lucas' },
    { number: 22, name: 'Pietro Rodrigues Xavier' },
    { number: 23, name: 'Ralph Venancio Barreira' },
    { number: 24, name: 'Salvador Martim Moras Baldo' },
    { number: 25, name: 'Sara de Melo Azevedo Kowalczyk' },
    { number: 26, name: 'Sofia Duarte Silva Sousa de Carvalho' },
    { number: 27, name: 'Tiago Fialho Cunha' },
    { number: 28, name: 'Tomás Frangi Páscoa' },
    { number: 29, name: 'Vicente Temudo Ferreira Pereira' },
  ],
};

function normalizeName(n: string): string {
  return n
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

async function main() {
  console.log('=== INICIANDO RECONCILIAÇÃO OFICIAL DE TODAS AS TURMAS ===');

  // 1. Fetch current users, publicProfiles, credentials
  const usersSnap = await getDocs(collection(db, 'users'));
  const profilesSnap = await getDocs(collection(db, 'publicProfiles'));

  const usersMap = new Map<string, any>();
  const usernamesSet = new Set<string>();
  const nicknamesSet = new Set<string>();

  usersSnap.forEach((d) => {
    const data = d.data();
    usersMap.set(d.id, { id: d.id, ...data });
    if (data.username) usernamesSet.add(String(data.username).toLowerCase());
    if (data.nickname) nicknamesSet.add(String(data.nickname).toLowerCase());
    if (data.publicId) nicknamesSet.add(String(data.publicId).toLowerCase());
  });

  profilesSnap.forEach((d) => {
    const data = d.data();
    if (data.nickname) nicknamesSet.add(String(data.nickname).toLowerCase());
    if (data.publicId) nicknamesSet.add(String(data.publicId).toLowerCase());
  });

  console.log(`Carregados ${usersMap.size} utilizadores e perfis existentes.`);

  const numberCorrections: {
    turma: string;
    studentName: string;
    oldNumber: number;
    newNumber: number;
    id: string;
    points: number;
  }[] = [];

  const studentsCreated: {
    turma: string;
    number: number;
    name: string;
    username: string;
    password: string;
    id: string;
  }[] = [];

  // STEP A: UPDATE NUMBERS OF EXISTING STUDENTS
  // We process turmas and update Firestore in batches
  for (const [turma, pList] of Object.entries(pdfPautas)) {
    const classUsers = Array.from(usersMap.values()).filter(
      (u) => u.turma === turma && u.role !== 'admin' && u.role !== 'teacher'
    );

    // Find matches
    for (const pStudent of pList) {
      const normP = normalizeName(pStudent.name);
      const matched = classUsers.find((u) => normalizeName(u.name || u.fullName || '') === normP);

      if (matched) {
        if (matched.number !== pStudent.number) {
          numberCorrections.push({
            turma,
            studentName: matched.name || matched.fullName,
            oldNumber: matched.number,
            newNumber: pStudent.number,
            id: matched.id,
            points: Number(matched.points || 0),
          });

          // Update users doc
          const userRef = doc(db, 'users', matched.id);
          const profileRef = doc(db, 'publicProfiles', matched.id);

          const now = new Date().toISOString();
          await writeBatch(db)
            .update(userRef, { number: pStudent.number, updatedAt: now })
            .set(profileRef, { number: pStudent.number, updatedAt: now }, { merge: true })
            .commit();

          // Update in-memory
          matched.number = pStudent.number;
        }
      }
    }
  }

  console.log(`\nATUALIZAÇÃO DE NÚMEROS CONCLUÍDA: ${numberCorrections.length} alunos corrigidos.`);

  // STEP B: INSERT MISSING STUDENTS
  const missingStudentsList: { turma: string; number: number; name: string }[] = [];

  for (const [turma, pList] of Object.entries(pdfPautas)) {
    const classUsers = Array.from(usersMap.values()).filter(
      (u) => u.turma === turma && u.role !== 'admin' && u.role !== 'teacher'
    );

    for (const pStudent of pList) {
      const normP = normalizeName(pStudent.name);
      const matched = classUsers.find((u) => normalizeName(u.name || u.fullName || '') === normP);

      if (!matched) {
        missingStudentsList.push({
          turma,
          number: pStudent.number,
          name: pStudent.name,
        });
      }
    }
  }

  console.log(`\nALUNOS EM FALTA IDENTIFICADOS: ${missingStudentsList.length} alunos.`);

  for (const missing of missingStudentsList) {
    const { fullName, firstName, lastName } = parseStudentName(missing.name);
    let username = '';

    if (missing.name === 'ALUNA CARLA EXPERIEINCIA') {
      username = 'aluna.carla';
      if (usernamesSet.has(username)) username = 'carla.experiencia';
    } else if (missing.turma === '5.º B' && missing.name.includes('Catarina Isabel Varela Semedo Ferreira')) {
      username = 'catarina.ferreira.5b';
      if (usernamesSet.has(username)) username = 'catarina.semedo';
    } else {
      username = generateKidUsername(fullName, missing.turma, usernamesSet);
    }
    usernamesSet.add(username);

    const plainPassword = generateKidPassword(new Set());
    const hashed = await hashPassword(plainPassword);

    const userId = `std_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const nickname = generateUniqueKidNickname(firstName || fullName, missing.turma, nicknamesSet);
    nicknamesSet.add(nickname.toLowerCase());
    const publicId = nickname;
    const avatar = getDefaultAvatar(username);
    const now = new Date().toISOString();

    const newUserData = {
      id: userId,
      name: fullName,
      fullName,
      firstName: firstName || fullName,
      lastName: lastName || '',
      greetingName: firstName || fullName,
      turma: missing.turma,
      number: missing.number,
      username,
      role: 'student',
      points: 0,
      level: 1,
      streak: 0,
      avatar,
      nickname,
      publicId,
      initialPassword: plainPassword,
      badges: [],
      completedActivities: [],
      createdAt: now,
      updatedAt: now,
    };

    const newProfileData = {
      id: userId,
      publicId,
      nickname,
      turma: missing.turma,
      number: missing.number,
      points: 0,
      role: 'student',
      avatar,
      activitiesCount: 0,
      badgeCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    const newCredentialData = {
      userId,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      createdAt: now,
      updatedAt: now,
    };

    const batch = writeBatch(db);
    batch.set(doc(db, 'users', userId), newUserData);
    batch.set(doc(db, 'publicProfiles', userId), newProfileData);
    batch.set(doc(db, 'credentials', userId), newCredentialData);
    await batch.commit();

    studentsCreated.push({
      turma: missing.turma,
      number: missing.number,
      name: fullName,
      username,
      password: plainPassword,
      id: userId,
    });

    console.log(`Criado aluno: [${missing.turma}] Nº ${missing.number} - ${fullName} (@${username})`);
  }

  // STEP C: FULL VERIFICATION AGAINST FIRESTORE
  console.log('\n=== REALIZANDO VERIFICAÇÃO FINAL DA BASE DE DADOS ===');
  const finalUsersSnap = await getDocs(collection(db, 'users'));
  const finalUsers = finalUsersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const verificationReport: any[] = [];
  let allPerfect = true;

  for (const [turma, pList] of Object.entries(pdfPautas)) {
    const classUsers = finalUsers.filter(
      (u: any) => u.turma === turma && u.role !== 'admin' && u.role !== 'teacher'
    );

    const isCountMatch = classUsers.length === pList.length;
    if (!isCountMatch) {
      allPerfect = false;
      console.error(`ERRO: Contagem de alunos para ${turma} difere! Esperado: ${pList.length}, Obtido: ${classUsers.length}`);
    }

    // Check each student
    for (const pStudent of pList) {
      const normP = normalizeName(pStudent.name);
      const found = classUsers.find((u: any) => normalizeName(u.name || u.fullName || '') === normP);

      if (!found) {
        allPerfect = false;
        console.error(`ERRO: Aluno ${pStudent.name} não encontrado em ${turma}`);
      } else if ((found as any).number !== pStudent.number) {
        allPerfect = false;
        console.error(`ERRO: Número de ${pStudent.name} em ${turma} é ${(found as any).number}, esperado ${pStudent.number}`);
      }
    }

    verificationReport.push({
      turma,
      pautaTotal: pList.length,
      dbTotal: classUsers.length,
      status: isCountMatch ? 'PERFEITO' : 'DISCREPÂNCIA',
    });
  }

  console.log('\nRELATÓRIO DE SÍNTESE:', JSON.stringify(verificationReport, null, 2));
  console.log('ESTADO GERAL:', allPerfect ? '100% CORRETO E VERIFICADO' : 'COM DISCREPÂNCIAS');

  // Save report to file
  const reportPath = `./reconciliation_execution_report_${Date.now()}.json`;
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        correctionsCount: numberCorrections.length,
        corrections: numberCorrections,
        createdCount: studentsCreated.length,
        created: studentsCreated,
        verification: verificationReport,
      },
      null,
      2
    )
  );

  console.log('Relatório gravado em:', reportPath);
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal reconciliation error:', err);
  process.exit(1);
});
