package com.freework.base.formula;

public class FormulaCheck {
	private int leftBracket;
	private int rightBracket;
	
	protected String formula;
	
	
	 public int getLeftBracket() {
		return leftBracket;
	}


	public int getRightBracket() {
		return rightBracket;
	}


	public void setFormula(String formula) {
		this.formula = formula;
	}


	public void checkValid(){
	     if ((formula==null) || (formula.trim().length()<=0) ) {
	      throw new IllegalArgumentException("����������calRule!");
	     }
	      compareToLR();
	      checkFormula();
	   }
	
	
	 /*
	   /*��鹫ʽ���Ƿ���ڷǷ��ַ���(+��-)��
	   */
	protected void checkFormula(){
	      boolean isOk=true;
	      String[] bracket =new String[2];
	      String[] sign=new String[4];
	      bracket[0]="(";
	      bracket[1]=")";
	      sign[0]="+";
	      sign[1]="`";
	      sign[2]="*";
	      sign[3]="/";
	      String vstr="";
	      for(int i=0;i<bracket.length;i++){
	        for(int j=0;j<sign.length;j++){
	          if (i==0)
	            vstr=bracket[i]+sign[j];
	          else
	            vstr=sign[j]+bracket[i];
	          if (formula.indexOf(vstr)>0){
	        	  throw  new IllegalArgumentException("��ʽ�д��ڷǷ��ַ�"+vstr);

	          }
	        }
	      }
	      for(int i=0;i<sign.length;i++){
	        for(int j=0;j<sign.length;j++){
	          vstr=sign[i]+sign[j];
	          if (formula.indexOf(vstr)>0){
	        	  throw   new IllegalArgumentException("��ʽ�д��ڷǷ��ַ�"+vstr);

	          }
	        }
	      }
	      if (formula.indexOf("()")>0){
	    	  throw  new IllegalArgumentException("��ʽ�д��ڷǷ��ַ�()");

	      }
	      if (formula.indexOf(")(")>0){
	    	  throw  new IllegalArgumentException("��ʽ�д��ڷǷ��ַ�)(");

	      }
	    }
	  
	
	
	
	 /*
    /*�Ա��������Ÿ���
    */
	   protected void compareToLR() {
    	leftBracket = getBracket(formula,'(');
    	rightBracket = getBracket(formula,')');
        if (leftBracket > rightBracket) {
        	throw new IndexOutOfBoundsException("�������ĸ������������������飡");
        }  else if (rightBracket  > leftBracket)  {
        	throw new IndexOutOfBoundsException("�������ĸ�������������������");
          
        }
    }
	   protected int getBracket(String calRule,char rracket) {
        int bracket = 0;
         int startL = calRule.indexOf(rracket);
         if (startL != -1) {
             calRule = calRule.substring(startL + 1, calRule.length());
         }
         while (startL != -1) {
         	bracket++;
             startL = calRule.indexOf(rracket);
             calRule = calRule.substring(startL + 1, calRule.length());
         }
         return bracket;
     }
 	
}