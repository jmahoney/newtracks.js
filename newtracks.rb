require 'sinatra'
require 'lastfm'
require 'json'

enable :sessions

LASTFM = Lastfm.new(ENV['LAST_API'], ENV['LAST_SECRET'])

get '/' do  
  if session[:lastfm_session].nil?
    redirect "http://www.last.fm/api/auth/?api_key=#{ENV['LAST_API']}&cb=#{url('/callback')}"
  else
    erb :index
  end
end

# handle getting a token back from last.fm
get '/callback' do
  session[:lastfm_token] = params[:token]
  session[:lastfm_session] = LASTFM.auth.get_session(params[:token])
  redirect '/'
end

# get recent tracks for the logged in user
get '/recent_tracks' do
  content_type :json  
  tracks = LASTFM.user.get_recent_tracks(username)
  tracks.to_json
end


helpers do
  def username
    if session[:lastfm_session]
      session[:lastfm_session]['name']
    else
      "UNKNOWN"
    end
  end
end
