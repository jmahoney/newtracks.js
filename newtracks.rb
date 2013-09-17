require 'sinatra'
require 'lastfm'

enable :sessions

LASTFM = Lastfm.new(ENV['LAST_API'], ENV['LAST_SECRET'])


get '/callback' do
  session[:lastfm_token] = params[:token]
  session[:lastfm_session] = LASTFM.auth.get_session(params[:token])[:key]
  
  redirect 'index.html'
end

get '/' do
  if session[:lastfm_session].nil?
    redirect "http://www.last.fm/api/auth/?api_key=#{ENV['LAST_API']}&cb=#{url('/callback')}"
  else
    redirect 'index.html'
  end
end
