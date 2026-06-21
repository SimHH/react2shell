// 파일 업로드 후 해당 파일 모듈 exec 함수 실행을 위한 라우터 ==> 실무에서는 무조건 없음 (테스트를 위해 임의 생성)

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const filePath = body.filePath;
    const command = body.command;
    
    const absolutePath = path.join(process.cwd(), filePath);
    console.log('📂 파일 경로:', absolutePath);
    
    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json({
        success: false,
        error: `File not found: ${filePath}`
      }, { status: 404 });
    }
    
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    console.log('📄 파일 크기:', fileContent.length, 'bytes');
    
    const moduleWrapper = `
      const module = { exports: {} };
      const exports = module.exports;
      ${fileContent}
      module.exports;
    `;
    const scriptModule = eval(moduleWrapper);

    let result;
    if (typeof scriptModule?.execute === 'function') {
      result = await scriptModule.execute(command);
    } else if (typeof scriptModule?.run === 'function') {
      result = scriptModule.run();
    } else {
      result = 'Script loaded successfully';
    }
    
    return NextResponse.json({
      success: true,
      output: result,
      scriptPath: filePath
    });
    
  } catch (error: any) {
    console.error('실행 오류:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}