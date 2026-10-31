'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [form, setForm] = useState({ name: '', gender: '남성', age: '', phone: '', mbti: '', bio: '' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('applications').insert([
      { ...form, age: parseInt(form.age, 10) }
    ])

    setLoading(false)
    if (error) alert('오류 발생: ' + error.message)
    else setDone(true)
  }

  if (done) return (
    <div style={{ maxWidth: 440, margin: '60px auto', padding: 30, textAlign: 'center', fontFamily: 'sans-serif', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <h1 style={{ color: '#ff3366', fontSize: 32, marginBottom: 8 }}>getween</h1>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>🎉 참가 신청이 완료되었습니다!</h2>
      <p style={{ color: '#666', lineHeight: 1.6 }}>
        신청서 확인 후 안내 문자를 발송해 드립니다.<br/>
        입금 확인 순으로 참가 신청이 최종 확정됩니다.
      </p>
      <div style={{ marginTop: 24, padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8, fontSize: 14 }}>
        <strong>참가비 입금 계좌</strong><br/>
        카카오뱅크 3333-XX-XXXXXX (예금주: getween)
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: 440, margin: '40px auto', padding: '30px 24px', fontFamily: 'sans-serif', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', backgroundColor: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ 
          fontSize: 36, 
          fontWeight: 800, 
          background: 'linear-gradient(45deg, #ff3366, #ff6b81)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          margin: 0,
          letterSpacing: '-1px'
        }}>
          getween
        </h1>
        <p style={{ color: '#888', fontSize: 14, marginTop: 6, fontWeight: 500 }}>
          새로운 인연을 만나는 로테이션 소개팅
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#444' }}>이름</label>
          <input placeholder="홍길동" required onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', marginTop: 4, boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#444' }}>성별</label>
          <select onChange={e => setForm({...form, gender: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', marginTop: 4, boxSizing: 'border-box' }}>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#444' }}>나이</label>
          <input placeholder="28" type="number" required onChange={e => setForm({...form, age: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', marginTop: 4, boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#444' }}>연락처</label>
          <input placeholder="010-1234-5678" required onChange={e => setForm({...form, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', marginTop: 4, boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#444' }}>MBTI (선택)</label>
          <input placeholder="ENFP" onChange={e => setForm({...form, mbti: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', marginTop: 4, boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 'bold', color: '#444' }}>자기소개 및 이상형</label>
          <textarea placeholder="자신의 매력 포인트나 원하는 상대방 성향을 적어주세요." onChange={e => setForm({...form, bio: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', marginTop: 4, height: 90, boxSizing: 'border-box', resize: 'none' }} />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: 14, background: 'linear-gradient(45deg, #ff3366, #ff6b81)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 16, boxShadow: '0 4px 12px rgba(255, 51, 102, 0.3)' }}>
          {loading ? '제출 중...' : 'getween 참가 신청하기'}
        </button>
      </form>
    </div>
  )
}
