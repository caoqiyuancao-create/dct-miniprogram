// Screen — Past Issues list (magazine-cover style)
// Scrollable vertical feed of past issues. Clicking opens the detail view.

function ScreenReview({ go, setReviewId }) {
  const D = window.DCT_DATA;
  const past = D.getPastIssues();

  const open = (id) => {
    setReviewId && setReviewId(id);
    go('review-detail');
  };

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <WxHeader title="往期回顾" />

      {/* Header */}
      <div style={{ padding: '20px 22px 8px' }}>
        <div className="mono" style={{ fontSize: 11, color: '#55709a', letterSpacing: 4 }}>
          DCT · ARCHIVE
        </div>
        <div className="serif" style={{
          fontSize: 30, fontWeight: 900, color: '#0f2855', letterSpacing: 1, marginTop: 6,
        }}>一期一会</div>
        <div style={{ fontSize: 12.5, color: '#55709a', marginTop: 6, lineHeight: 1.6 }}>
          每一期沙龙的主题、主讲人与当日留痕。
        </div>
      </div>

      {/* List */}
      <div style={{ padding: '24px 18px 60px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {past.map(issue => (
          <ReviewCard key={issue.id} issue={issue} onClick={() => open(issue.id)} />
        ))}

        {/* "coming soon" placeholder for the teaser future issue */}
        <div style={{
          background: '#fff', borderRadius: 18,
          padding: '24px 20px', border: '0.5px dashed #c9d4e5',
          textAlign: 'center',
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: 3, color: '#8496b3' }}>VOL.03 · UPCOMING</div>
          <div className="serif" style={{ fontSize: 16, color: '#55709a', marginTop: 8, fontWeight: 600 }}>
            下一期主题酝酿中
          </div>
          <div style={{ fontSize: 12, color: '#8496b3', marginTop: 4 }}>
            敬请期待 · 或在主页留言推荐话题
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ issue, onClick }) {
  const placeholder = !issue.poster;
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 18, overflow: 'hidden',
      border: '0.5px solid #e3e9f3',
      boxShadow: '0 4px 14px rgba(15,40,85,0.06)',
    }}>
      {/* Cover area */}
      <div style={{
        height: 180, position: 'relative',
        background: placeholder
          ? 'linear-gradient(135deg, #e7f0fa 0%, #9dbfe3 100%)'
          : '#000',
        overflow: 'hidden',
      }}>
        {issue.poster && (
          <img src={issue.poster} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88,
          }} />
        )}
        {placeholder && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          }}>
            <div style={{
              width: 56, height: 56,
              clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
              background: 'rgba(255,255,255,0.7)', marginBottom: 8,
            }} />
            <div className="serif" style={{ fontSize: 13, color: '#1a3a78', fontWeight: 500, opacity: 0.7 }}>
              封面整理中
            </div>
          </div>
        )}
        {/* Vol badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
          padding: '4px 10px', borderRadius: 6,
          fontSize: 10, letterSpacing: 2,
          fontFamily: '"JetBrains Mono", monospace', color: '#0f2855', fontWeight: 600,
        }}>
          VOL.0{issue.number}
        </div>
        {/* Date badge */}
        {issue.date && (
          <div style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(15,40,85,0.8)', color: '#fff',
            backdropFilter: 'blur(10px)',
            padding: '4px 10px', borderRadius: 6,
            fontSize: 10, letterSpacing: 1.5,
            fontFamily: '"JetBrains Mono", monospace',
          }}>{issue.date}</div>
        )}
      </div>

      {/* Meta */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div className="serif" style={{
          fontSize: 22, fontWeight: 900, color: '#0f2855', lineHeight: 1.25, letterSpacing: 0.5,
        }}>{issue.title}</div>
        {issue.subtitle && (
          <div style={{ fontSize: 12.5, color: '#55709a', marginTop: 4 }}>{issue.subtitle}</div>
        )}
        {issue.speaker?.name && (
          <div style={{
            marginTop: 12, fontSize: 11.5, color: '#6b7a91', letterSpacing: 0.5,
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            主创 / {issue.speaker.name}
          </div>
        )}
        {issue.summary && (
          <div style={{
            fontSize: 12.5, color: '#3d5f94', marginTop: 10, lineHeight: 1.65,
            textWrap: 'pretty',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{issue.summary}</div>
        )}
        <div style={{
          marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div className="mono" style={{ fontSize: 10, color: '#8496b3', letterSpacing: 2 }}>
            {issue.status === 'finished' ? 'READ MORE' : 'PREVIEW'}
          </div>
          <svg width="8" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="#8496b3" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function ScreenReviewDetail({ go, reviewId }) {
  const D = window.DCT_DATA;
  const issue = D.getById(reviewId) || D.getPastIssues()[0];
  if (!issue) return null;

  const hasPhotos = issue.photos && issue.photos.length > 0;
  const hasHighlights = issue.highlights && issue.highlights.length > 0;

  return (
    <div style={{ background: '#f6f8fc', minHeight: '100%' }}>
      <WxHeader title={`回顾 · VOL.0${issue.number}`} />

      {/* Cover */}
      <div style={{
        height: 240,
        background: issue.poster
          ? `url(${issue.poster}) center / cover`
          : 'linear-gradient(135deg, #e7f0fa 0%, #9dbfe3 100%)',
        position: 'relative',
      }}>
        {!issue.poster && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 80, height: 80,
              clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
              background: 'rgba(255,255,255,0.7)',
            }} />
          </div>
        )}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '60px 22px 18px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(15,40,85,0.85) 100%)',
          color: '#fff',
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: 3, opacity: 0.8 }}>
            VOL.0{issue.number}  ·  {issue.date || '—'}
          </div>
          <div className="serif" style={{
            fontSize: 28, fontWeight: 900, marginTop: 4, letterSpacing: 1, lineHeight: 1.2,
          }}>{issue.title}</div>
          {issue.subtitle && (
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{issue.subtitle}</div>
          )}
        </div>
      </div>

      {/* Speaker */}
      {issue.speaker?.name && (
        <div style={{ padding: '20px 22px 0' }}>
          <div style={{
            background: '#fff', borderRadius: 14, padding: '14px 16px',
            border: '0.5px solid #e3e9f3',
          }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: 2, color: '#8496b3' }}>SPEAKER</div>
            <div className="serif" style={{ fontSize: 17, fontWeight: 700, color: '#0f2855', marginTop: 4 }}>
              {issue.speaker.name} <span style={{ fontSize: 12, fontWeight: 400, color: '#55709a' }}>{issue.speaker.title}</span>
            </div>
            {issue.speaker.org && (
              <div style={{ fontSize: 12, color: '#55709a', marginTop: 4 }}>{issue.speaker.org}</div>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {issue.summary && (
        <div style={{ padding: '22px 22px 0' }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: 3, color: '#55709a' }}>RECAP</div>
          <div className="serif" style={{
            fontSize: 17, fontWeight: 700, color: '#0f2855', marginTop: 4, marginBottom: 10,
          }}>当日留痕</div>
          <div style={{ fontSize: 13, color: '#2a3d5c', lineHeight: 1.85, textWrap: 'pretty' }}>
            {issue.summary}
          </div>
        </div>
      )}

      {/* Highlights */}
      {hasHighlights && (
        <div style={{ padding: '24px 22px 0' }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: 3, color: '#55709a' }}>HIGHLIGHTS</div>
          <div className="serif" style={{
            fontSize: 17, fontWeight: 700, color: '#0f2855', marginTop: 4, marginBottom: 14,
          }}>几句金句</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {issue.highlights.map((h, i) => (
              <div key={i} style={{
                background: 'linear-gradient(180deg, rgba(233,185,73,0.08) 0%, rgba(233,185,73,0.02) 100%)',
                borderLeft: '2px solid #c9a24a',
                padding: '12px 14px', borderRadius: '0 12px 12px 0',
              }}>
                <div className="serif" style={{ fontSize: 14, color: '#1a3a78', lineHeight: 1.7, fontStyle: 'italic' }}>
                  「{h.quote}」
                </div>
                {h.author && (
                  <div style={{ fontSize: 11, color: '#6b7a91', marginTop: 6, letterSpacing: 1 }}>— {h.author}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photos placeholder */}
      {!hasPhotos && (
        <div style={{ padding: '24px 22px 0' }}>
          <div style={{
            background: '#fff', borderRadius: 14, padding: '20px 18px',
            border: '0.5px dashed #c9d4e5', textAlign: 'center',
          }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: 3, color: '#8496b3' }}>PHOTOS</div>
            <div style={{ fontSize: 13, color: '#55709a', marginTop: 8, lineHeight: 1.6 }}>
              当日照片整理中
            </div>
          </div>
        </div>
      )}

      {/* Back */}
      <div style={{ padding: '32px 22px 50px' }}>
        <button onClick={() => go('review')} style={{
          width: '100%', height: 42, borderRadius: 21,
          background: 'transparent', border: '1px solid #c9d4e5',
          color: '#1a3a78', fontSize: 13, fontWeight: 500,
          fontFamily: '"Noto Sans SC", system-ui',
        }}>返回往期列表</button>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenReview, ScreenReviewDetail });
